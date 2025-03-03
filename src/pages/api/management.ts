import { NextApiRequest, NextApiResponse } from "next";
import ManagementUsers from "@/models/ManagmentUsers";
import Role from "@/models/Roles";
import { ObjectId } from "mongodb";
import connectDB from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  switch (req.method) {
    case "GET":
      try {
        if (req.query.id) {
          const user = await ManagementUsers.findOne({
            _id: new ObjectId(req.query.id as string),
          });
          return res.status(200).json(user);
        }
        const users = await ManagementUsers.find({});
        return res.status(200).json(users);
      } catch (error) {
        return res
          .status(500)
          .json({ msg: "Failed to fetch data", err: error });
      }

    case "POST":
      try {
        const user = req.body;

        const roleExists = await Role.findById(user.role);
        if (!roleExists) {
          return res.status(400).json({ error: "Invalid role ID" });
        }

        const existingUser = await ManagementUsers.findOne({
          username: user.username,
        });

        if (existingUser) {
          return res.status(400).json({ msg: "User already exists" });
        }

        const result = new ManagementUsers(user);
        result.save();
        const userResponse = result.toObject();
        delete userResponse.password;
        return res.status(201).json(userResponse);
      } catch (error: any) {
        if (error.name === "ValidationError") {
          return res
            .status(400)
            .json({ msg: "Validation Error", errors: error.errors });
        }
        return res
          .status(500)
          .json({ msg: "Failed to insert data", err: error });
      }

    case "PUT":
      try {
        const { id, ...updateData } = req.body;
        const roleExists = await Role.findById(updateData.role);
        if (!roleExists) {
          return res.status(400).json({ error: "Invalid role ID" });
        }
        const result = await ManagementUsers.findByIdAndUpdate(
          { _id: id, ...updateData },
          { new: true, runValidators: true }
        );
        if (!result) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(result);
      } catch (error) {
        return res
          .status(500)
          .json({ msg: "Failed to update data", err: error });
      }

    case "DELETE":
      try {
        const { id } = req.body;
        const result = await ManagementUsers.findByIdAndDelete(id);
        return res.status(200).json({ msg: `User deleted`, id: result.id });
      } catch (error) {
        return res
          .status(500)
          .json({ msg: "Failed to delete data", err: error });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
