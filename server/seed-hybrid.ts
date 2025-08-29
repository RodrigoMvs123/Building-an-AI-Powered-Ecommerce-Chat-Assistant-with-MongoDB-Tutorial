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