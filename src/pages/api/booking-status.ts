import { REQ_METHODS } from "@/constants/api-constants";
import connectDB from "@/lib/mongodb";
import BookingStatus from "@/models/BookingStatus";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  debugger
  try {
    if (req.method === REQ_METHODS.GET) {
      const bookingStatus = await BookingStatus.find({});
      return res.status(200).json(bookingStatus);
    } else if(req.method === REQ_METHODS.POST){
        const bookingStatus = req.body;

        const existingStatus = await BookingStatus.findOne({
            description: bookingStatus.description,
        });

        if (existingStatus) {
            return res.status(400).json({ msg: "Status already exists" });
        }

        const result = new BookingStatus(bookingStatus);
        await result.save();
        return res.status(201).json(result);
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}
