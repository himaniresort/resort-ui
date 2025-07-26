import { REQ_METHODS } from "@/constants/api-constants";
import connectDB from "@/lib/mongodb";
import UsersSchema from "@/models/Users";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  try {
    debugger;
    if (req.method === REQ_METHODS.GET) {
      if (req.query.id) {
        const user = await UsersSchema.findOne({
          _id: new ObjectId(req.query.id as string),
        });
        return res.status(200).json(user);
      }
      const users = await UsersSchema.find({});
      return res.status(200).json(users);
    } else if (req.method === REQ_METHODS.POST) {
      const user = req.body;

      const result = new UsersSchema(user);
      await result.save();
      return res.status(201).json(result);
    } else if (req.method === REQ_METHODS.PUT) {
      const { id } = req.query; // Get User ID from URL

      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const updatedUser = await UsersSchema.findByIdAndUpdate(
        id,
        req.body, // Replace with new data
        { new: true, overwrite: true } // Returns updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(updatedUser);
    } else if (req.method === REQ_METHODS.DELETE) {
      const { id } = req.body;
      const result = await UsersSchema.findByIdAndDelete(id);
      return res.status(200).json({ msg: `User deleted`, id: result.id });
    } else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}
