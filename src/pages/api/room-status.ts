import { REQ_METHODS } from "@/constants/api-constants";
import connectDB from "@/lib/mongodb";
import RoomStatus from "@/models/RoomStatus";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  debugger
  try {
    if (req.method === REQ_METHODS.GET) {
      const roomStatus = await RoomStatus.find({});
      return res.status(200).json(roomStatus);
    } else if(req.method === REQ_METHODS.POST){
        const roomStatus = req.body;

        const existingStatus = await RoomStatus.findOne({
            description: roomStatus.description,
        });

        if (existingStatus) {
            return res.status(400).json({ msg: "Status already exists" });
        }

        const result = new RoomStatus(roomStatus);
        await result.save();
        return res.status(201).json(result);
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}
