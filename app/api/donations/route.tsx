import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextResponse } from 'next/server';

// Create a single instance of the MongoClient to be reused across requests
const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let mongoClient: MongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/**
 * Utility function to connect to the database and get the collection
 */
async function getCollection() {
  const client = await mongoClient.connect();
  const db = client.db('database');
  return db.collection('donations');
}

export async function GET() {
  try {
    const collection = await getCollection();
    const donations = await collection.find({}).toArray();
    return NextResponse.json(donations, { status: 200 });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 404 }
    );
  }
}
