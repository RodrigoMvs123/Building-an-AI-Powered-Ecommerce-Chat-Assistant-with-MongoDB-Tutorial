## Building an AI Powered Ecommerce Chat Assistant with MongoDB Tutorial

- https://www.youtube.com/watch?v=9tANiA0LKn4 

1. Autonomously decides when to search the database versus when to respond direct
2. Uses custom tools to actively search through real product data
3. Maintains conversation memory and adapts to failures
4. Takes multi-step actions: perceive, plan act and respond

LangGraph
- https://www.langchain.com/langgraph 

MongoDB
- https://www.mongodb.com/ 

Google AI Studio - Gemini
- https://aistudio.google.com/ 

#### Visual Studio Code
```
Explorer
Open Editors
server/
README.md
```

#### Terminal
```
cd server
npm init
```

#### Visual Studio Code
```
Explorer
Open Editors
server/package.json
README.md
```

package.json
```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": ""
}
```

#### Terminal
```
npm install --save-dev typescript @types/node
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node_modules
server/package-lock.json
package.json
README.md
```

server/package-lock.json
```json
{
  "name": "server",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "server",
      "version": "1.0.0",
      "license": "ISC",
      "devDependencies": {
        "@types/node": "^24.3.0",
        "typescript": "^5.9.2"
      }
    },
    "node_modules/@types/node": {
      "version": "24.3.0",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.3.0.tgz",
      "integrity": "sha512-aPTXCrfwnDLj4VvXrm+UUCQjNEvJgNA8s5F1cvwQU+3KNltTOkBm1j30uNLyqqPNe7gE3KFzImYoZEfLhp4Yow==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~7.10.0"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.2",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.2.tgz",
      "integrity": "sha512-CWBzXQrc/qOkhidw1OzBTQuYRbfyxDXJMVJ1XNwUHGROVmuaeiEm3OslpZ1RV96d7SKKjZKrSJu3+t/xlw3R9A==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "7.10.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.10.0.tgz",
      "integrity": "sha512-t5Fy/nfn+14LuOc2KNYg75vZqClpAiqscVvMygNnlsHBFpSXdJaYtXMcdNLpl/Qvc3P2cB3s6lOV51nqsFq4ag==",
      "dev": true,
      "license": "MIT"
    }
  }
}

```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
package-lock.json
server/package.json
README.md
```

package.json
```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/node": "^24.3.0",
    "typescript": "^5.9.2"
  }
}
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
index.ts
package-lock.json
server/package.json
README.md
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
index.ts
package-lock.json
server/package.json
README.md
```

package.json
```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "npx ts-node index.ts",
    "seed": "npx ts-node seed-database.ts"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/node": "^24.3.0",
    "typescript": "^5.9.2"
  }
}
```

#### Terminal
```
npm install express mongodb cors @langchain/google-genai @langchain/core @langchain/langgraph @langchain/langgraph-checkpoint-mongodb @langchain/mongodb dotenv langchain zod @types/cors @types/express ts-node @supabase/supabase-js
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
index.ts
package-lock.json
server/package.json
README.md
```

server/package.json
```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "npx ts-node index.ts",
    "seed": "npx ts-node seed-database.ts"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/node": "^24.3.0",
    "typescript": "^5.9.2",
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.3",
    "ts-node": "^10.9.2"
    
  },
  "dependencies": {
    "@langchain/core": "^0.3.66",
    "@langchain/google-genai": "^0.2.16",
    "@langchain/langgraph": "^0.4.0",
    "@langchain/langgraph-checkpoint-mongodb": "^0.1.0",
    "@langchain/mongodb": "^0.1.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.1",
    "express": "^5.1.0",
    "langchain": "^0.3.30",
    "mongodb": "^6.18.0",
    "zod": "^3.25.76"
  }
}
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
index.ts
package-lock.json
server/package.json
README.md
```

server/index.ts
```typescript
import 'dotenv/config'
import express, { Express, Request, Response } from "express"
import { MongoClient } from "mongodb"
import { callAgent } from './agent'    

const app: Express = express()

import cors from 'cors'
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGODB_ATLAS_URI as string)
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
.env
index.ts
package-lock.json
server/package.json
README.md
```

server/.env
```

```

MongoDB
- https://www.mongodb.com/ 

Or Free option 
Supabase

```
npm install @supabase/supabase-js
```

#### MongoDB UI
```
Clusters
  + Create
    Create Deployment 
      Add Current IP Address 
        Connect to your application 
        - Drivers 
          Use this connection string in your application 
          - mongodb+srv://rodrigo:<db_password>@cluster... ( Copy )
```

Past 

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
.env
index.ts
package-lock.json
server/package.json
README.md
```

server/.env
```
// MONGODB_ATLAS_URI=mongodb+srv://rodrigo:123@cluster...

# Supabase Configuration
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
// Supabase Password ( ... )

GOOGLE_API_KEY=
```

#### MongoDB UI
```
Security
  Database Access
  - rodrigo
    Edit
      Password Authentication
      - rodrigo
      - 123 ( Copy )
        Update User
```

Paste Password Authentication 

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
.env
index.ts
package-lock.json
server/package.json
README.md
```

server/.env
```
// MONGODB_ATLAS_URI=mongodb+srv://rodrigo:123@cluster...

# Supabase Configuration
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
// Supabase Password ( ... )

GOOGLE_API_KEY=
```

Google Cloud API
- console.cloud.google.com 

```
API and Services
  Credentials 
    + Create Credentials
      API Key
        - AI API Key ( Copy )
```

#### Visual Studio Code
``` 
Explorer
Open Editors
server/
node-modules
.env
index.ts
package-lock.json
package.json
README.md
``` 

.env
```
// MONGODB_ATLAS_URI=mongodb+srv://rodrigo:123@cluster...


# Supabase Configuration
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
// Supabase Password ( ... )

GOOGLE_API_KEY=...
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
.env
index.ts
package-lock.json
server/package.json
README.md
```

server/index.ts
```typescript
import 'dotenv/config'
import express, { Express, Request, Response } from "express"
import { MongoClient } from "mongodb"
import { callAgent } from './agent'    

const app: Express = express()

import cors from 'cors'
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGODB_ATLAS_URI as string)

async function startServer() {
  try {
      await client.connect()
      await client.db("admin").command( { ping: 1 })
      console.log("You successfully connected to MongoDB!") 

      app.get('/', (req: Request, res: Response) => {
        res.send('LagGraph Agent Server') 
      })

      app.post('/chat', async (req: Request, res: Response) =>{
        const initialMessage = req.body.message 
        const threadId = Date.now().toString()
        console.log(initialMessage)
        try {
            const response = await callAgent(client, initialMessage, threadId)
            res.json({ threadId, response})
        } catch (error) {
            console.log('Error starting conversation:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
      })

      app.post('/chat/:threadId', async (req: Request, res: Response) => {
        const { threadId } = req.params 
        const { message } = req.body
        try {
            const response = await callAgent(client, message, threadId)
            res.json({ response })
        } catch (error) {
            console.error('Error in chat:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
      })

      const PORT = process.env.PORT || 8000
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
      process.exit(1)
  }
}

startServer()
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
.env
index.ts
package-lock.json
server/package.json
seed-database.ts
README.md
```

seed-database.ts
```typescript
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbbedings } from "@langchain/google-genai"
import { StructuredOutputParser } from "@langchain/core/output_parsers"
import { MongoClient } from "mongodb"  
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb"
import { z } from "zod"
import "dotenv/config"

const client = new MongoClient(process.env.MONGODB_ATLAS_URI as string)

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash", 
  temperature: "0.7",
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
    prices: z.obejtct({
        full_price: z.number(),
        sell_price: z.number(), 
    }),
    categories: z.array(z.string()),
    user_reviews: z.array(
        z.object({
            review_date: z.string(),
            rating: z.number(),
            commnet: z.string(), 
      })
  ),
  notes: z.string(),
})

type Item = z.infer<typeof itemSchema>

const parser = StructuredOutputParser.fromZodSchema(z.array(itemSchema))

async function setupDatabaseAndCollection(): Promise<void> {
  console.log("Setting up database and collection...")
   cons db = client.db("Inventory_database")
   const collections = await.db.listCollections({ name: "items" }).toArray()

   if (collections.lenght === 0 ) {
      await db.createCollection("items")
      console.log("Created 'items' collection in 'inventory_database' databse")
   } else {
      console.log("'items' collection already exists in 'inventory_database' database")
   }
}

async function createVectorSearchIndex(): Promise<void> {
  try {
      const db = client.db("inventory_database")
      const collection = db.collection("items")
      await collection.dropIndexes()
      const vectorSearchIdx = {
          name: "vector_index",
          type: "vectorSearch",
          definition: {
            "fields": [
              {
              "type": "vector"
              "path": "embeddings"
              "numDimensions": 768,
              "similarity": "cosine"
              }
            ] 
          }
      }
      console.log("Creating vector search index...")
      await collection.createSearchIndex(vectorSearchIdx);
      console.log("Successfully created vector search index");
      
  } catch (error) {
      console.log('Failed to create vector search index:', error)
  }
}

async function generateSyntheticData(): Promise<Item[]> {
  const prompt = `You are a helpful assistant that generate furniture store item data. Generate 10 furniture store items. Each record should include the following fields. item_id, prices, categories, user_reviews, notes. Ensure variety in the data and realistic values.
  
  ${parser.getFormatInstructions()}` 

  console.log("Generating synthetic data...")

  const response = await llm.invoke(prompt)

  return parser.parse(response.content as string)
} 

async function createItemSummary(item: Item) : Promise<string> {
  return new Promise((resolve) => {
    const manufactureDetails = `Made in ${item.manufacture_address.country}`
    const categories = item.categories.join(", ")
    const userReviews = item.user_reviews.map((review)=> 
      `Rated ${review.string} on ${review.review_date}: ${review.comment}`)
    .join("")
    const basicInfo = `${item.item_name} ${item.item_description} from the brand ${item.brand}`
    const price = `At full price it costs: ${item.price.full_price} USD, On sale it costs: ${item.prices.sale_price} USD`
    const notes = item.notes

    const summary = `${basicInfo}. Manufacturer: ${manufacturerDetails}. Categories: ${categories}. Reviews: ${userReviews}. Price: ${price}. Notes: ${notes}`

    resolve(summary)
  })
}

async function seedDatabase(): Promise<void> {
  try {
      await client.connect()
      await.client.db("admin").command({ ping: 1})
      console.log("You successfully connected to MongoDB!")

      await setupDatabaseAndCollection()
      await createVectorSearchIndex()

      const db = client.db("inventory_database")
      const collection = db.collection("items")

      await collection.deleteMany({})
      console.log("Cleared existing data from items collection")

      const syntheticData = await generateSyntheticData()
 
      const recordsWithSummaries = await Promise.all(
        syntheticData.map(async (record) => {
          pageContent: await createItemSummary(record),
          metadata: {...record}
        }) 
      )

      for (const record of recordWithSummaries) {
        await MongoDBAtlasVectorSearch.fromDocuments(
          [record],
          new GoogleGenerativeAIEmbedings({
            apiKey: process.env.GOOGLE_API;
            modelName: "text-embedding-004"
          }),
          {
            collection,
            indexName: "vector_index",
            textKey: "embedding_text",
            embeddingKey: "embedding"
          }
      )
      console.log("Successfully processed and saved record:", record.metadata.item_id)
    }
      console.log("Database seeding complete")  
  } catch (error) {
      console.error("Error seeding database":, error)
  } finally {
    await client.close()
  }
}

seedDatabse().catch(console.error)
```

#### Terminal 
```
npx tsc --init
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
.env
index.ts
package-lock.json
server/package.json
seed-database.ts
tsconfig.json
README.md
```

server/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFilesNames": true,
    "strict": true, 
    "skipLibCheck": true
  },
    "ts-node": {
      "transpileOnly": true
  }
}
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
.env
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

server/index-supabase.ts
```typescript
import 'dotenv/config'
import express, { Express, Request, Response } from "express"
import { MongoClient } from "mongodb"
import { createClient } from '@supabase/supabase-js'
import { callAgent } from './agent'
import { callAgentSupabase } from './agent-supabase'

const app: Express = express()

import cors from 'cors'
app.use(cors())
app.use(express.json())

// Database configuration
const DATABASE_TYPE = process.env.DATABASE_TYPE || 'mongodb'

// Initialize database clients
let mongoClient: MongoClient | null = null
let supabase: any = null

if (DATABASE_TYPE === 'supabase') {
  supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON_KEY as string
  )
  console.log('Using Supabase database')
} else {
  mongoClient = new MongoClient(process.env.MONGODB_ATLAS_URI as string)
  console.log('Using MongoDB database')
}

async function startServer() {
  try {
    // Connect to MongoDB if using MongoDB
    if (DATABASE_TYPE === 'mongodb' && mongoClient) {
      await mongoClient.connect()
      await mongoClient.db("admin").command({ ping: 1 })
      console.log("You successfully connected to MongoDB!")
    } else if (DATABASE_TYPE === 'supabase') {
      // Test Supabase connection
      const { data, error } = await supabase.from('items').select('count').limit(1)
      if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist yet
        throw error
      }
      console.log("You successfully connected to Supabase!")
    }

    app.get('/', (req: Request, res: Response) => {
      res.send(`LangGraph Agent Server - Using ${DATABASE_TYPE.toUpperCase()}`)
    })

    app.post('/chat', async (req: Request, res: Response) => {
      const initialMessage = req.body.message
      const threadId = Date.now().toString()
      console.log('Initial message:', initialMessage)
      
      try {
        let response: string
        
        if (DATABASE_TYPE === 'supabase') {
          response = await callAgentSupabase(supabase, initialMessage, threadId)
        } else {
          response = await callAgent(mongoClient!, initialMessage, threadId)
        }
        
        res.json({ threadId, response })
      } catch (error) {
        console.log('Error starting conversation:', error)
        res.status(500).json({ error: 'Internal server error' })
      }
    })

    app.post('/chat/:threadId', async (req: Request, res: Response) => {
      const { threadId } = req.params
      const { message } = req.body
      
      try {
        let response: string
        
        if (DATABASE_TYPE === 'supabase') {
          response = await callAgentSupabase(supabase, message, threadId)
        } else {
          response = await callAgent(mongoClient!, message, threadId)
        }
        
        res.json({ response })
      } catch (error) {
        console.error('Error in chat:', error)
        res.status(500).json({ error: 'Internal server error' })
      }
    })

    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`Database: ${DATABASE_TYPE.toUpperCase()}`)
    })
  } catch (error) {
    console.error(`Error connecting to ${DATABASE_TYPE}:`, error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  if (mongoClient) {
    await mongoClient.close()
  }
  process.exit(0)
})

startServer()
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
.env
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

server/seed-database-supabase.ts
```typescript
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
```

#### Supabase UI

Step 1: Enable **pgvector** Extension

> In your Supabase SQL Editor, run this FIRST:
```sql
sqlCREATE EXTENSION IF NOT EXISTS vector;
```

Step 2: Then Create the Table

> After the extension is enabled, run this:
```sql
sqlCREATE TABLE IF NOT EXISTS items (
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
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
.env
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

server/seed-hybrid.ts
```typescript
import 'dotenv/config'

const DATABASE_TYPE = process.env.DATABASE_TYPE || 'mongodb'

async function runSeed() {
  console.log('Environment variables loaded:')
  console.log('DATABASE_TYPE:', DATABASE_TYPE)
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Not set')
  console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY ? 'Set' : 'Not set')
  
  console.log(`Starting database seeding with ${DATABASE_TYPE.toUpperCase()}...`)
  
  if (DATABASE_TYPE === 'supabase') {
    console.log('Running Supabase seed...')
    const supabaseSeed = await import('./seed-database-supabase')
    // The import will execute the seeding automatically
  } else {
    console.log('Running MongoDB seed...')
    const mongoSeed = await import('./seed-database-fixed')
    // The import will execute the seeding automatically
  }
}

runSeed().catch(console.error)
```

#### Terminal 

> When using MongoDB database run:

/server 
```
npm run seed
```

> When using the hybrid database approach run:
```
npm run seed-hybrid

  > server@1.0.0 seed-hybrid
  > npx ts-node seed-hybrid.ts

  Environment variables loaded:
  DATABASE_TYPE: supabase
  SUPABASE_URL: Set
  GOOGLE_API_KEY: Set
  Starting database seeding with SUPABASE...
  Running Supabase seed...
  Starting Supabase database seeding...
  Setting up Supabase tables...
  Creating items table manually...

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

  Supabase table setup complete
  Cleared existing data from items table
  Generating synthetic data...
  Successfully processed and saved record: F001
  Successfully processed and saved record: F002
  Successfully processed and saved record: F003
  Successfully processed and saved record: F004
  Successfully processed and saved record: F005
  Successfully processed and saved record: F006
  Successfully processed and saved record: F007
  Successfully processed and saved record: F008
  Successfully processed and saved record: F009
  Successfully processed and saved record: F010
  Supabase database seeding complete
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
.env
agent.ts
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

server/agent.ts
```typescript
import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/schema" 
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts"
import { StateGraph, Annotation } from "@langchain/langgraph" 
import { tool } from "@langchain/core/tools" 
import { ToolNode } from "@langchain/langgraph,prebuild"
import { MongoDBSaver } "@langchain/langgraph-checkpoint-mongodb"
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb"
import { MongoClient } from "mongodb" 
import { z } from "zod" 
import "dotenv/config"

async function retryWithBackoff<T> (
  fn: () => Promise<T>,
  maxRetries: 3 
) : Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempr++) {
    try {
        return await fn()
    } catch (error) {
        if (error.status == 429 && attempt < maxRetries) {
            const delay = Math.min(1000 * Math.pow(2, attempt), 3000)
            console.error(`Rate limit hit. Retrying in ${delay/1000} seconds...`)
            await new Promise(resolve => setTimeout(resolve, delay))
            continue
        }
        throw error
    }
  }
  throw new Error("max retries execced") 
}

export async function callAgent(client: MongoClient, query: string, thread_id: string) {
  try {
      const dbName = "inventory_database"
      const db = client.db(dbName)
      const colllection = db.collection("items")

      const GraphState = Annotation.Root({
        messages: Annotation<BaseMessage[]>({
            reducer: (x, y) => x.concat(y), 
        })
      })

      const itemLookupTool = tool(
        async ({ query, n = 10}) => {
          try {
            console.log("Item lookup tool called with query:", query)
            const totalCount = await collection.countDocuments()
            console.log(`Total documents in collection: ${totalCount}`)

            if (totalCount === 0 ) {
                console.log("Collection is empty")
                return JSON.stringify({
                    error: "No items found in inventory",
                    message: "The inventory database appears to be empty",
                    count: 0
                })
            }

            const sampleDocs = await collection.find({}).limit(3).toArray()
            console.log("Sample documents:", sampleDocs)

            const dbConfig = {
              collection: collection,
              indexName: "vector_index",
              textKey: "embedding_text",
              embeddingKey: "embedding"
            }

            const vectorStore = new MongoDBAtlasVectorSearch(
              new GoogleGenerativeAIEmbeddings({
                  apiKey: process.env.GOOGLE_API_KEY,
                  model: "text-embedding-004"
              }),
              dbConfig  
            )
            console.log("Performing vector search...")
            const result = await vectorStore.similaritySearchWithScore(query, n)
            console.log(`Vector search returned ${result.length} results`)

            if (results.lenght === 0 ) {
              console.log("Vector search returned no results, trying text search...") 
               
              const textResults = await collection.find({
                  $or: [
                  { item_name: { $regex: query, $options: 'i' } },
                  { item_decription: { $regex: query, $options: 'i' } },
                  { categories: { $regex: query, $options: 'i' } },
                  { embedding_text: { $regex: query, $options: 'i' } }
                  ]
              }).limit(n).toArray()

              console.log(`Text serach returned ${textResults.length} results`)

              return.JSON.stringify({
                resutls: textResults,
                searchType: "text",
                query: query,
                count: textResults.length

              })
            }

            return JSON.stringify({
              results: result,
              searchType: "vector",
              query: query,
              count: result.length
            })
          } catch (error) {
              console.error("Error in item lookup:", error)
              console.error("Erros details", {
                  message: error.message,
                  stack: error.stack,
                  name: error.name
              })
              
              return JSON.stringify({
                  error: "Failed to seach inventory",
                  details: error.message,
                  query: query
              })
          }
        }, 
        {
          name: "item_lookup",
          description: "Gathers furniture items details from the Inventory database"
          schema: z.object({
              query: z.string(). describe("The search query"),
              n: z.number().optional().default(10).decribe("Number of returns to return") 
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

      function shouldContinue(state: typeof GraphState.state) {
        const messages = state.messages
        conts lastMessage = messages[messages.length - 1] as AIMessage

        if (lastMessage.tool_calls?.length) {
          return "tools" 
        }
        return "__end__"
      }

      async function callModel(state: typeof GraphState.State) {
        return retryWithBackoff(async() => {
          const prompt = ChatPromptTemplate.fromMessages([
            [
                "system", // System message defines the AI's role and behavior
                `You are a helpful E-commerce Chatbot Agent for a furniture store. 

                IMPORTANT: You have access to an item_lookup tool that searches the furniture inventory database. ALWAYS use this tool when customers ask about furniture items, even if the tool returns errors or empty results.

                When using the item_lookup tool:
                - If it returns results, provide helpful details about the furniture items
                - If it returns an error or no results, acknowledge this and offer to help in other ways
                - If the database appears to be empty, let the customer know that inventory might be being updated

                Current time: {time}`
            ],
            new MessagePlaceHolder("message"),
          ])

          const formattedPrompt = await prompt.formattedMessages({
              time: new Date().toISOString(),
              messages: state.messages,  
          })

          const result = await model.invoke(formattedPrompt)
          return { messages: [result] }
        })
      }

      const workflow = new stateGraph(GraphState)
      .addNode("agent", callModel)
      .addNode("tools", toolNode)
      .addNode("__start__", "agent")
      .addConditionalEdges("agent", shouldContinue)
      .addEdge("tools", "agent")

        const checkpointer = new MongoDBServer({ clinet, dbName })
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

  } catch (error) {
      console.error("Error in callAgent", error.message)

      if (error.status === 429) {
          throw new Error("Service temporarily unavailable due to rate limits. Please try again in a minute.")  
      } else if (error.status === 401) {
          throw new Error("Authentication failed. Please check your API configuration.")
      } else {
        throw new Error(`Agent failed: ${error.message}`)
      }
  }
} 
```

#### Supabase UI

Vector similarity search function

> In your Supabase SQL Editor, run this:

```sql
-- Function for vector similarity search
CREATE OR REPLACE FUNCTION match_items(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id bigint,
  item_id text,
  item_name text,
  item_description text,
  brand text,
  manufacture_address jsonb,
  prices jsonb,
  categories text[],
  user_reviews jsonb[],
  notes text,
  embedding_text text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    items.id,
    items.item_id,
    items.item_name,
    items.item_description,
    items.brand,
    items.manufacture_address,
    items.prices,
    items.categories,
    items.user_reviews,
    items.notes,
    items.embedding_text,
    1 - (items.embedding <=> query_embedding) AS similarity
  FROM items
  WHERE 1 - (items.embedding <=> query_embedding) > match_threshold
  ORDER BY items.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Create RPC function for table creation (optional helper)
CREATE OR REPLACE FUNCTION create_items_table_if_not_exists()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
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
EXCEPTION
  WHEN duplicate_table THEN
    -- Table already exists, do nothing
    NULL;
END;
$$;
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
.env
agent.ts
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

server/agent-supabase.ts
```typescript
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
            console.error(`Rate limit hit. Retrying in ${delay/1000} seconds...`)
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
```

#### Visual Studio Code
```
Explorer
Open Editors
server/
node-modules
.env
agent.ts
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

/server/package.json
```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "npx ts-node index.ts",
    "dev-hybrid": "npx ts-node index-supabase.ts",
    "seed": "npx ts-node seed-database-supabase.ts",
    "seed-mongo": "npx ts-node seed-database-fixed.ts",
    "seed-supabase": "npx ts-node seed-database-supabase.ts",
    "seed-hybrid": "npx ts-node seed-hybrid.ts"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.3",
    "@types/node": "^24.3.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.9.2"
  },
  "dependencies": {
    "@langchain/core": "^0.3.72",
    "@langchain/google-genai": "^0.2.16",
    "@langchain/langgraph": "^0.4.0",
    "@langchain/langgraph-checkpoint-mongodb": "^0.1.0",
    "@langchain/mongodb": "^0.1.0",
    "@supabase/supabase-js": "^2.55.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.1",
    "express": "^5.1.0",
    "mongodb": "^6.18.0",
    "zod": "^3.25.76"
  }
}
``` 

#### Terminal

> With database option: MongoDB

/server
```
npm run dev

 > server@1.0.0 dev
 > npx ts-node index.ts

 You successfully connected to MongoDB!
 Server running on port 8000

```

> With database option: Supabase 

/server
```
npm run dev-hybrid

  > server@1.0.0 dev-hybrid
  > npx ts-node index-supabase.ts

  Using Supabase database
  You successfully connected to Supabase!
  Server running on port 8000
  Database: SUPABASE
```

#### New Terminal

> With database option: MongoDB

```
curl -X POST -H "Content-Type: application/json" \
-d '{"message": "Do you have any dining tables?"}' \
http://localhost:8000/chat 
```

> With database option: Supabase 

```
curl -Method POST -Uri "http://localhost:8000/chat" -Headers @{ "Content-Type" = "application/json" } -Body '{ "message": "Do you have any dining tables?" }'

  >> 


  StatusCode        : 200
  StatusDescription : OK
  Content           : {"threadId":"1756405650424","response":"Yes, we have at least one dining table in
                      stock:\n\n**Oak Dining Table (F002):**\n\n*   **Description:** Solid oak dining table
                      with six chairs.\n*   **Brand:**...
  RawContent        : HTTP/1.1 200 OK
                      Access-Control-Allow-Origin: *
                      Connection: keep-alive
                      Keep-Alive: timeout=5
                      Content-Length: 413
                      Content-Type: application/json; charset=utf-8
                      Date: Thu, 28 Aug 2025 18:27:36 GMT...
  Forms             : {}
  Headers           : {[Access-Control-Allow-Origin, *], [Connection, keep-alive], [Keep-Alive, timeout=5],
                      [Content-Length, 413]...}
  Images            : {}
  InputFields       : {}
  Links             : {}
  ParsedHtml        : mshtml.HTMLDocumentClass
  RawContentLength  : 413
  }
```

#### Visual Studio Code
```
Explorer
Open Editors
client/
server/
node-modules
.env
agent.ts
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

#### Terminal

client/
```
npx create-react-app .
```

#### Visual Studio Code
```
Explorer
Open Editors
client/
node_modules
public
src
.gitignore
package-lock.json
package.json
README.md
server/
node-modules
.env
agent.ts
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

#### Terminal

client/
```
npm run start
```

#### Visual Studio Code
```
Explorer
Open Editors
client/
node_modules
public
src
src/components
src/components/EcommerceStore.js
src/App.css
src/App.js
src/index.css
src/index.js
src/logo.svg
.gitignore
package-lock.json
package.json
README.md
server/
node-modules
.env
agent.ts
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

client/src/App.js
```javascript
import './App.css'
import EcommerceStore from './components/EcommerceStore'

function App() {
  return (
    <div className="app">
      <EcommerceStore/>
    </div>
  )
}

export default App
```

#### Visual Studio Code
```
Explorer
Open Editors
client/
node_modules
public
src
src/components
src/components/EcommerceStore.js
src/App.css
src/App.js
src/index.css
src/index.js
src/logo.svg
.gitignore
package-lock.json
package.json
README.md
server/
node-modules
.env
agent.ts
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

client/src/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
```

#### Visual Studio Code
```
Explorer
Open Editors
client/
node_modules
public
src
src/components
src/components/EcommerceStore.js
src/App.css
src/App.js
src/index.css
src/index.js
src/logo.svg
.gitignore
package-lock.json
package.json
README.md
server/
node-modules
.env
agent.ts
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

client/src/index.css
```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

#### Visual Studio Code
```
Explorer
Open Editors
client/
node_modules
public
src
src/components
src/components/EcommerceStore.js
src/App.css
src/App.js
src/index.css
src/index.js
src/logo.svg
.gitignore
package-lock.json
package.json
README.md
server/
node-modules
.env
agent.ts
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

src/components/EcommerceStore.js
```javascript
import { FaSearch, FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa'
import ChatWidget from "./ChatWidget"

const EcommerceStore = () => {
  
  return 
    <>
    <header className="header">
      <div className="container">
        <div className="top-bar">
          <div className="logo">ShopSmart</div>
          <div className="search-bar">
            <input type="text" placeholder="Search for products..."/>
            <button>
              <FaSearch/>
            </button>
          </div>

          <div className="nav-icons">
            <a hraf="#account">
              <FaUser size={20} />
            </a>
            <a hraf="#wishlist">
              <FaHeart size={20} />
              <span className="badge">{3}</span>
            </a>
            <a hred="#cart">
              <FaShoopingCart size={20} />
              <span className="badge">{2}</span>
            </a>
          </div>
         </div>

         <nav className="nav-bar">
           <ul>
              <li><a href="#" className="active">Home</a></li>
              <li><a href="#">Electronics</a></li>
              <li><a href="#">Clothing</a></li>
              <li><a href="#">Home & Kitchen</a></li>
              <li><a href="#">Beauty</a></li>
              <li><a href="#">Sports</a></li>
              <li><a href="#">Deals</a></li>
            </ul>
         </nav>
      </div>
    </header> 

    <main>
      <div className="hero">
        <div className="container">
          <h1>Summer Sale is Live!</h1>
          <p>Get up tp 50% off on selected items. Limited time offer.</p>
          <button>Shop Now</button>
        </div>
      </div>
    </main>

    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Shop</h3>
              <ul>
                <li><a href="#">Electronics</a></li>
                <li><a href="#">Clothing</a></li>
                <li><a href="#">Home & Kitchen</a></li>
                <li><a href="#">Beauty</a></li>
                <li><a href="#">Sports</a></li>
              </ul>
          </div>
          <div className="footer-column">
              <h3>Customer Service</h3>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Shipping Policy</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
                <li><a href="#">Order Tracking</a></li>
              </ul>
            </div>
          <div className="footer-column">
              <h3>About Us</h3>
              <ul>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Sustainability</a></li>
              </ul>
            </div>
        <div className="footer-column">
              <h3>Connect With Us</h3>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Pinterest</a></li>
                <li><a href="#">YouTube</a></li>
              </ul>
            </div>
        </div>

        <div className="copyright">
          &copy {new Date().getFullYear()} ShopSmart. All rights reserved.
        </div>
      </div>
    </footer>
    <ChatWidget/>
    </>
}

export default EcommerceStore
```

#### Terminal
```
npm i react-icons
```

#### Visual Studio Code
```
Explorer
Open Editors
client/
node_modules
public
src
src/components
src/components/EcommerceStore.js
src/components/ChatWidget.js
src/App.css
src/App.js
src/index.css
src/index.js
src/logo.svg
.gitignore
package-lock.json
package.json
README.md
server/
node-modules
.env
agent.ts
index-supabase.ts
index.ts
package-lock.json
package.json
seed-database-supabase.ts
seed-database.ts
seed-hybrid.ts
tsconfig.json
README.md
```

src/components/ChatWidget.js
```javascript
import React, { useState, useEffect, useRef } from 'react'
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots } from 'react-icons/fa'

const isOpen = true
const ChatWidget = () => {
  return (
    <div className={`chat-widget-container ${isOpen ? 'open' : ''}`}>

    </div>
  )
}

export default ChatWidget
```
