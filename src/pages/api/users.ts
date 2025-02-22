import type { NextApiRequest, NextApiResponse } from "next";
import { clientPromise, db } from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await clientPromise; // Ensure the connection is established
    const users = await db.collection("users").find({}).toArray();

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
