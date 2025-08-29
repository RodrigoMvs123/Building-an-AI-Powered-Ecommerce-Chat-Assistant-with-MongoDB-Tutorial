import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import { StructuredOutputParser } from "@langchain/core/output_parsers"
import { createClient } from '@supabase/supabase-js'
import { z } from "zod"
import "dotenv/config"

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
)

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY
})

const itemSchema = z.object({
  item_id: z.string(),
  item_name: z.string(),
  item_description: z.string(),
  brand: z.string(),
  manufacture_address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    post_code: z.string(),
    country: z.string(),
  }),
  prices: z.object({
    full_price: z.number(),
    sell_price: z.number(),
  }),
  categories: z.array(z.string()),
  user_reviews: z.array(
    z.object({
      review_date: z.string(),
      rating: z.number(),
      comment: z.string(),
    })
  ),
  notes: z.string(),
})

type Item = z.infer<typeof itemSchema>

const parser = StructuredOutputParser.fromZodSchema(z.array(itemSchema))

async function setupSupabaseTables(): Promise<void> {
  console.log("Setting up Supabase tables...")
  
  try {
    // Create items table if it doesn't exist
    const { error: tableError } = await supabase.rpc('create_items_table_if_not_exists')
    
    if (tableError && !tableError.message.includes('already exists')) {
      // If the RPC doesn't exist, we'll create the table manually via SQL
      console.log("Creating items table manually...")
      
      // Note: In production, you should run this SQL in Supabase dashboard
      console.log(`
        Please run this SQL in your Supabase dashboard:
        
        CREATE TABLE IF NOT EXISTS items (
          id BIGSERIAL PRIMARY KEY,
          item_id TEXT UNIQUE NOT NULL,
          item_name TEXT NOT NULL,
          item_description TEXT,
          brand TEXT,
          manufacture_address JSONB,
          prices JSONB,
          categories TEXT[],
          user_reviews JSONB[],
          notes TEXT,
          embedding_text TEXT,
          embedding VECTOR(768),
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_items_item_id ON items(item_id);
        CREATE INDEX IF NOT EXISTS idx_items_embedding ON items USING ivfflat (embedding vector_cosine_ops);
      `)
    }
    
    console.log("Supabase table setup complete")
  } catch (error) {
    console.error("Error setting up Supabase tables:", error)
    throw error
  }
}

async function generateSyntheticData(): Promise<Item[]> {
  const prompt = `You are a helpful assistant that generates furniture store item data. Generate 10 furniture store items. Each record should include the following fields: item_id, item_name, item_description, brand, manufacture_address, prices, categories, user_reviews, notes. Ensure variety in the data and realistic values.
  
  ${parser.getFormatInstructions()}`

  console.log("Generating synthetic data...")

  const response = await llm.invoke(prompt)
  return parser.parse(response.content as string)
}

async function createItemSummary(item: Item): Promise<string> {
  return new Promise((resolve) => {
    const manufacturerDetails = `Made in ${item.manufacture_address.country}`
    const categories = item.categories.join(", ")
    const userReviews = item.user_reviews.map((review) =>
      `Rated ${review.rating} on ${review.review_date}: ${review.comment}`)
      .join(". ")
    const basicInfo = `${item.item_name} ${item.item_description} from the brand ${item.brand}`
    const price = `At full price it costs: ${item.prices.full_price} USD, On sale it costs: ${item.prices.sell_price} USD`
    const notes = item.notes

    const summary = `${basicInfo}. Manufacturer: ${manufacturerDetails}. Categories: ${categories}. Reviews: ${userReviews}. Price: ${price}. Notes: ${notes}`

    resolve(summary)
  })
}

async function generateEmbedding(text: string): Promise<number[]> {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: "text-embedding-004"
  })
  
  const embedding = await embeddings.embedQuery(text)
  return embedding
}

async function seedSupabaseDatabase(): Promise<void> {
  try {
    console.log("Starting Supabase database seeding...")

    await setupSupabaseTables()

    // Clear existing data
    const { error: deleteError } = await supabase
      .from('items')
      .delete()
      .neq('id', 0) // Delete all records

    if (deleteError) {
      console.error("Error clearing existing data:", deleteError)
    } else {
      console.log("Cleared existing data from items table")
    }

    const syntheticData = await generateSyntheticData()

    for (const item of syntheticData) {
      try {
        const summary = await createItemSummary(item)
        const embedding = await generateEmbedding(summary)

        const { error } = await supabase
          .from('items')
          .insert({
            item_id: item.item_id,
            item_name: item.item_name,
            item_description: item.item_description,
            brand: item.brand,
            manufacture_address: item.manufacture_address,
            prices: item.prices,
            categories: item.categories,
            user_reviews: item.user_reviews,
            notes: item.notes,
            embedding_text: summary,
            embedding: `[${embedding.join(',')}]` // Convert array to string format for pgvector
          })

        if (error) {
          console.error(`Error inserting item ${item.item_id}:`, error)
        } else {
          console.log("Successfully processed and saved record:", item.item_id)
        }
      } catch (itemError) {
        console.error(`Error processing item ${item.item_id}:`, itemError)
      }
    }

    console.log("Supabase database seeding complete")
  } catch (error) {
    console.error("Error seeding Supabase database:", error)
    throw error
  }
}

seedSupabaseDatabase().catch(console.error)