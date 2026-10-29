import type { NextApiRequest, NextApiResponse } from "next";
import { clientPromise } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { COLLECTIONS, REQ_METHODS } from "@/constants/api-constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { GET, POST, PUT, DELETE } = REQ_METHODS;

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Check request method
    if (req.method === GET) {
      const bookingLookupPipeline = [
        {
          $lookup: {
            from: "room-type",
            let: {
              roomTypeId: {
                $convert: {
                  input: "$roomTypeId",
                  to: "objectId",
                  onError: null,
                  onNull: null,
                },
              },
            },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$roomTypeId"] },
                },
              },
              { $project: { name: 1 } },
            ],
            as: "roomDetails",
          },
        },
        {
          $lookup: {
            from: COLLECTIONS.USERS,
            let: {
              userId: {
                $convert: {
                  input: "$userId",
                  to: "objectId",
                  onError: null,
                  onNull: null,
                },
              },
            },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$userId"] },
                },
              },
              { $project: { name: 1, contact: 1 } },
            ],
            as: "userDetails",
          },
        },
        {
          $set: {
            roomName: { $arrayElemAt: ["$roomDetails.name", 0] },
            userName: { $arrayElemAt: ["$userDetails.name", 0] },
            userContact: { $arrayElemAt: ["$userDetails.contact", 0] },
          },
        },
        {
          $unset: ["roomDetails", "userDetails"],
        },
      ];

      // 1. Check if a specific booking is requested
      if (req.query.id) {
        const bookingPipeline = [
          { $match: { bookingReferenceId: req.query.id } },
          ...bookingLookupPipeline,
        ];

        const booking = await db
          .collection(COLLECTIONS.BOOKINGS)
          .aggregate(bookingPipeline)
          .toArray();

        if (!booking || booking.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Booking not found" });
        }

        return res.status(200).json({ success: true, data: booking[0] });
      }

      // 2. Fetch all bookings with joins
      const bookings = await db
        .collection(COLLECTIONS.BOOKINGS)
        .aggregate(bookingLookupPipeline)
        .toArray();

      return res.status(200).json({ success: true, data: bookings });
    }

    if (req.method === POST) {
      const newBooking = req.body;
      const result = await db
        .collection(COLLECTIONS.BOOKINGS)
        .insertOne(newBooking);
      return res.status(201).json({
        ...newBooking,
        _id: result.insertedId.toString(),
      });
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
  } catch (error: any) {
    console.error("Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A booking with this reference ID already exists. Please try again.",
      });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
