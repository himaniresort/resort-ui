import type { NextApiRequest, NextApiResponse } from "next";
import { clientPromise } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { COLLECTIONS, REQ_METHODS } from "@/constants/api-constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { GET, POST, PUT, DELETE } = REQ_METHODS;

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Check request method
    if (req.method === GET) {
      // Check if a specific booking is requested
      if (req.query.id) {
        const booking = await db
          .collection(COLLECTIONS.BOOKINGS)
          .findOne({ _id: new ObjectId(req.query.id as string) });

        return res.status(200).json({ success: true, data: booking });
      }

      // Fetch all bookings
      const users = await db
        .collection(COLLECTIONS.BOOKINGS)
        .find({})
        .toArray();
      return res.status(200).json({ success: true, data: users });
    }

    if (req.method === POST) {
      const newUser = req.body;
      const result = await db.collection(COLLECTIONS.USERS).insertOne(newUser);
      return res
        .status(201)
        .json({ success: true, message: "User added", id: result.insertedId });
    }

    // if (req.method === PUT) {
    //   const { id, ...updateData } = req.body;
    //   const result = await db
    //     .collection(COLLECTIONS.USERS)
    //     .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    //   return res.status(200).json({
    //     success: true,
    //     message: "User updated",
    //     modifiedCount: result.modifiedCount,
    //   });
    // }

    // if (req.method === DELETE) {
    //   const { id } = req.query;
    //   await db
    //     .collection(COLLECTIONS.USERS)
    //     .deleteOne({ _id: new ObjectId(id as string) });

    //   return res.status(200).json({ success: true, message: "User deleted" });
    // }

    // Handle unsupported methods
    res.setHeader("Allow", [GET, POST, PUT, DELETE]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
