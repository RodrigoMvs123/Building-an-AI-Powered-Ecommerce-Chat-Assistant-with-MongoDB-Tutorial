import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages"
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts"
import { StateGraph, Annotation } from "@langchain/langgraph"
import { tool } from "@langchain/core/tools"
import { ToolNode } from "@langchain/langgraph/prebuilt"
import { MemorySaver } from "@langchain/langgraph"
import { createClient } from '@supabase/supabase-js'
import { z } from "zod"
import "dotenv/config"

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error: any) {
      if (error.status == 429 && attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 30000)
        console.error(`Rate limit hit. Retrying in ${delay / 1000} seconds...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
      throw error
    }
  }
  throw new Error("max retries exceeded")
}

export async function callAgentSupabase(supabase: any, query: string, thread_id: string) {
  try {
    const GraphState = Annotation.Root({
      messages: Annotation<BaseMessage[]>({
        reducer: (x, y) => x.concat(y),
      })
    })

    const itemLookupTool = tool(
      async ({ query, n = 10 }) => {
        try {
          console.log("Item lookup tool called with query:", query)

          // Check total count
          const { count, error: countError } = await supabase
            .from('items')
            .select('*', { count: 'exact', head: true })

          if (countError) {
            console.error("Error counting documents:", countError)
            return JSON.stringify({
              error: "Failed to access inventory database",
              message: countError.message,
              query: query
            })
          }

          const totalCount = count || 0
          console.log(`Total documents in collection: ${totalCount}`)

          if (totalCount === 0) {
            console.log("Collection is empty")
            return JSON.stringify({
              error: "No items found in inventory",
              message: "The inventory database appears to be empty",
              count: 0
            })
          }

          // Get sample documents for debugging
          const { data: sampleDocs, error: sampleError } = await supabase
            .from('items')
            .select('*')
            .limit(3)

          if (sampleError) {
            console.error("Error fetching sample docs:", sampleError)
          } else {
            console.log("Sample documents:", sampleDocs?.length || 0, "items")
          }

          // Try vector search if embedding column exists
          console.log("Attempting vector similarity search...")

          try {
            // Generate embedding for the query
            const embeddings = new GoogleGenerativeAIEmbeddings({
              apiKey: process.env.GOOGLE_API_KEY,
              model: "text-embedding-004"
            })

            const queryEmbedding = await embeddings.embedQuery(query)

            // Perform vector similarity search using Supabase's pgvector
            const { data: vectorResults, error: vectorError } = await supabase.rpc(
              'match_items',
              {
                query_embedding: queryEmbedding,
                match_threshold: 0.5,
                match_count: n
              }
            )

            if (vectorError) {
              console.log("Vector search failed, falling back to text search:", vectorError.message)
              throw new Error("Vector search not available")
            }

            console.log(`Vector search returned ${vectorResults?.length || 0} results`)

            if (vectorResults && vectorResults.length > 0) {
              return JSON.stringify({
                results: vectorResults,
                searchType: "vector",
                query: query,
                count: vectorResults.length
              })
            }
          } catch (vectorError) {
            console.log("Vector search failed, falling back to text search")
          }

          // Fallback to text search
          console.log("Performing text search...")
          const { data: textResults, error: textError } = await supabase
            .from('items')
            .select('*')
            .or(`item_name.ilike.%${query}%,item_description.ilike.%${query}%,brand.ilike.%${query}%,embedding_text.ilike.%${query}%`)
            .limit(n)

          if (textError) {
            console.error("Text search error:", textError)
            return JSON.stringify({
              error: "Failed to search inventory",
              details: textError.message,
              query: query
            })
          }

          console.log(`Text search returned ${textResults?.length || 0} results`)

          return JSON.stringify({
            results: textResults || [],
            searchType: "text",
            query: query,
            count: textResults?.length || 0
          })

        } catch (error: any) {
          console.error("Error in item lookup:", error)
          console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name
          })

          return JSON.stringify({
            error: "Failed to search inventory",
            details: error.message,
            query: query
          })
        }
      },
      {
        name: "item_lookup",
        description: "Gathers furniture items details from the Inventory database using Supabase",
        schema: z.object({
          query: z.string().describe("The search query"),
          n: z.number().optional().default(10).describe("Number of results to return")
        })
      }
    )

    const tools = [itemLookupTool]
    const toolNode = new ToolNode<typeof GraphState.State>(tools)

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      temperature: 0,
      maxRetries: 0,
      apiKey: process.env.GOOGLE_API_KEY,
    }).bindTools(tools)

    function shouldContinue(state: typeof GraphState.State) {
      const messages = state.messages
      const lastMessage = messages[messages.length - 1] as AIMessage

      if (lastMessage.tool_calls?.length) {
        return "tools"
      }
      return "__end__"
    }

    async function callModel(state: typeof GraphState.State) {
      return retryWithBackoff(async () => {
        const prompt = ChatPromptTemplate.fromMessages([
          [
            "system", // System message defines the AI's role and behavior
            `You are a helpful E-commerce Chatbot Agent for a furniture store. 

            IMPORTANT: You have access to an item_lookup tool that searches the furniture inventory database using Supabase. ALWAYS use this tool when customers ask about furniture items, even if the tool returns errors or empty results.

            When using the item_lookup tool:
            - If it returns results, provide helpful details about the furniture items
            - If it returns an error or no results, acknowledge this and offer to help in other ways
            - If the database appears to be empty, let the customer know that inventory might be being updated

            Current time: {time}`
          ],
          new MessagesPlaceholder("messages"),
        ])

        const formattedPrompt = await prompt.formatMessages({
          time: new Date().toISOString(),
          messages: state.messages,
        })

        const result = await model.invoke(formattedPrompt)
        return { messages: [result] }
      })
    }

    const workflow = new StateGraph(GraphState)
      .addNode("agent", callModel)
      .addNode("tools", toolNode)
      .addEdge("__start__", "agent")
      .addConditionalEdges("agent", shouldContinue)
      .addEdge("tools", "agent")

    // Use MemorySaver for checkpointing
    const checkpointer = new MemorySaver()
    const app = workflow.compile({ checkpointer })

    const finalState = await app.invoke({
      messages: [new HumanMessage(query)]
    }, {
      recursionLimit: 15,
      configurable: { thread_id: thread_id }
    })

    const response = finalState.messages[finalState.messages.length - 1].content
    console.log("Agent response:", response)
    return response

  } catch (error: any) {
    console.error("Error in callAgentSupabase:", error.message)

    if (error.status === 429) {
      throw new Error("Service temporarily unavailable due to rate limits. Please try again in a minute.")
    } else if (error.status === 401) {
      throw new Error("Authentication failed. Please check your API configuration.")
    } else {
      throw new Error(`Agent failed: ${error.message}`)
    }
  }
}
