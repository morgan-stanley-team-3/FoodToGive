import { MongoClient, ServerApiVersion } from "mongodb"

// Your MongoDB URI
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Environment variable MONGODB_URI is not defined");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function GET(request: Request) { 
  try { 
    // we want to match donations and requests based on the following: 
    // 1. consumeBy or bestBeforeDate must be before the timeNeededBy for the agency
    // 2. quantity/numOfServings should match (or at least within +-10%? )
    // 3. delivery method matching 
    // 4. food type - non-cooked food vs cooked food 

    // when 1 donation matches multiple requests equally, we break ties based on: 
    // 1. urgency -> the request w the most urgent needByTime is prioritised
    // 2. match quality -> with the same level of urgency, the match w the highest score is chosen 
    
  } catch { 

  } finally {

  }
}