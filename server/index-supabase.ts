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