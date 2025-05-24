import { REQ_METHODS } from "@/constants/api-constants";
import connectDB from "@/lib/mongodb";
import PlacesSchema from "@/models/Places";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB(); 
  try {
    debugger
    if (req.method === REQ_METHODS.GET) {
      if (req.query.id) {
        const place = await PlacesSchema.findOne({
          _id: new ObjectId(req.query.id as string),
        });
        return res.status(200).json(place);
      }
      const places = await PlacesSchema.find({});
      return res.status(200).json(places);
    } else if(req.method === REQ_METHODS.POST){
      const place = req.body;

      const result = new PlacesSchema(place);
      await result.save();
      return res.status(201).json(result);
    } else if(req.method === REQ_METHODS.PUT ){
      const { id } = req.query; // Get RoomType ID from URL
  
      if (!id) {
        return res.status(400).json({ error: "Place ID is required" });
      }

      const updatedPlace = await PlacesSchema.findByIdAndUpdate(
        id,
        req.body, // Replace with new data
        { new: true, overwrite: true } // Returns updated document
      );

      if (!updatedPlace) {
        return res.status(404).json({ error: "RoomType not found" });
      }
      return res.status(200).json(updatedPlace);

    } else if(req.method === REQ_METHODS.DELETE) {
        const { id } = req.body;
        const result = await PlacesSchema.findByIdAndDelete(id);
        return res.status(200).json({ msg: `Place deleted`, id: result.id });

    } else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}
