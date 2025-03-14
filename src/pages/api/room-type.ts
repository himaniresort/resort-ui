import { REQ_METHODS } from "@/constants/api-constants";
import connectDB from "@/lib/mongodb";
import RoomType from "@/models/RoomType";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  try {
    if (req.method === REQ_METHODS.GET) {
      const roomType = await RoomType.find({});
      return res.status(200).json(roomType);
    } else if(req.method === REQ_METHODS.POST){
        const roomType = req.body;

        const existingType = await RoomType.findOne({
            name: roomType.name,
        });

        if (existingType) {
            return res.status(400).json({ msg: "Room type already exists" });
        }

        const result = new RoomType(roomType);
        await result.save();
        return res.status(201).json(result);
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}
