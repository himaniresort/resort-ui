import { REQ_METHODS } from "@/constants/api-constants";
import connectDB from "@/lib/mongodb";
import RoomType from "@/models/RoomType";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  try {
    if (req.method === REQ_METHODS.GET) {
      if (req.query.id) {
        const roomType = await RoomType.findOne({
          _id: new ObjectId(req.query.id as string),
        });
        return res.status(200).json(roomType);
      }
      const roomTypeData = await RoomType.find({});
      const data = roomTypeData.map((roomType) => ({
        roomTypeId: roomType._id.toString(),
        type: roomType.type,
        description: roomType.description,
        image: roomType.image,
        name: roomType.name,
        max_occupancy: roomType.max_occupancy,
        total_rooms: roomType.total_rooms,
        cost: roomType.cost,
        longDescription: roomType.longDescription,
        shortDescription: roomType.shortDescription,
      }));

      console.log("z-data", data);

      return res.status(200).json(data);
    } else if (req.method === REQ_METHODS.POST) {
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
    } else if (req.method === REQ_METHODS.PUT) {
      const { id } = req.query; // Get RoomType ID from URL

      if (!id) {
        return res.status(400).json({ error: "RoomType ID is required" });
      }

      const updatedRoomType = await RoomType.findByIdAndUpdate(
        id,
        req.body, // Replace with new data
        { new: true, overwrite: true } // Returns updated document
      );
      console.log("---", req.body, updatedRoomType);
      if (!updatedRoomType) {
        return res.status(404).json({ error: "RoomType not found" });
      }
      return res.status(200).json(updatedRoomType);
    } else if (req.method === REQ_METHODS.DELETE) {
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
