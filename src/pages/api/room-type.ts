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
          type: roomType.type,
      });

      if (existingType) {
          return res.status(400).json({ msg: "Room Type already exists" });
      }

      const result = new RoomType(roomType);
      await result.save();
      return res.status(201).json(result);
    } else if(req.method === REQ_METHODS.PUT ){
      const { id } = req.query; // Get RoomType ID from URL
  
      if (!id) {
        return res.status(400).json({ error: "RoomType ID is required" });
      }

      const updatedRoomType = await RoomType.findByIdAndUpdate(
        id,
        req.body, // Replace with new data
        { new: true, overwrite: true } // Returns updated document
      );

      if (!updatedRoomType) {
        return res.status(404).json({ error: "RoomType not found" });
      }
      return res.status(200).json(updatedRoomType);

    } else if(req.method === REQ_METHODS.DELETE) {
        const { id } = req.body;
        const result = await RoomType.findByIdAndDelete(id);
        return res.status(200).json({ msg: `Room Type deleted`, id: result.id });

    } else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}
