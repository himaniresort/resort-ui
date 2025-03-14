import { REQ_METHODS } from "@/constants/api-constants";
import connectDB from "@/lib/mongodb";
import Room from "@/models/Rooms";
import RoomStatus from "@/models/RoomStatus";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  try {
    if (req.method === REQ_METHODS.GET) {
      const rooms = await Room.find({})
      .populate("roomType", "name cost") // Fetch roomType details
      .populate("status", "description");  // Fetch status details;
      return res.status(200).json(rooms);
    } else if(req.method === REQ_METHODS.POST){
        const { roomNo, roomType } = req.body;

        const openStatus = await RoomStatus.findOne({ description: "open" });

        if (!openStatus) {
            return res.status(400).json({ msg: "RoomStatus 'open' not found" });
        }

        const existingRoomNo = await Room.findOne({
            roomNo: roomNo,
        });

        if (existingRoomNo) {
            return res.status(400).json({ msg: "RoomNo already exists" });
        }

        const newRoom = new Room({
            roomNo,
            roomType,
            status: openStatus._id, // Ensure open status is assigned
            bookingId: null, // Default null
          });
        await newRoom.save();
        return res.status(201).json(newRoom);
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}
