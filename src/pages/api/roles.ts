import { REQ_METHODS } from "@/constants/api-constants";
import connectDB from "@/lib/mongodb";
import Role from "@/models/Roles";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    try {
        if (req.method === REQ_METHODS.GET) {
            const roles = await Role.find({});
            return res.status(200).json(roles);
        }
    } catch (error) {
        return res.status(500).json({ err: error });
    }
}