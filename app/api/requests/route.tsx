import { NextResponse } from "next/server";
import clientPromise from "../donations/route";

async function getCollection() {
    const client = await clientPromise;
    const db = client.db("database");
    return db.collection("requests");
}

export async function GET() {
    try {
        const collection = await getCollection();
        const requests = await collection.find({}).toArray();
        return NextResponse.json(requests, { status: 200 });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 404 }
        );
    }
}
