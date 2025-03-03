import { MongoClient, Db } from "mongodb";
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = { appName: "devrel.template.nextjs" };

let db: Db;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    console.log("Attempting to connect to MongoDB...");
    const mongoClient = new MongoClient(uri, options);

    globalWithMongo._mongoClientPromise = mongoClient
      .connect()
      .then((client) => {
        db = client.db(); // Auto-selects the DB from URI
        console.log("✅ Database connection success!");
        return client;
      })
      .catch((error) => {
        console.error("❌ Database connection failed!", error);
        throw error;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  console.log("Attempting to connect to MongoDB...");
  clientPromise = new MongoClient(uri, options)
    .connect()
    .then((client) => {
      db = client.db();
      console.log("✅ Database connection success!");
      return client;
    })
    .catch((error) => {
      console.error("❌ Database connection failed!", error);
      throw error;
    });
}

export { clientPromise, db };

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return; // Already connected, no need to reconnect
  }
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Stop the server if the database connection fails
  }
}
