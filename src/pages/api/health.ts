import type { NextApiRequest, NextApiResponse } from "next";
import { clientPromise } from "@/lib/mongodb"; // Import your MongoDB connection

type HealthResponse = {
  status: "healthy" | "unhealthy";
  database: "connected" | "disconnected";
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  try {
    // Check MongoDB connection
    await clientPromise; // Ensures the database is connected

    res.status(200).json({
      status: "healthy",
      database: "connected",
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
      message: "Database connection failed.",
    });
  }
}
