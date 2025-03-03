import { authenticateToken } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  authenticateToken(req, res, () => {
    try {
      res.status(200).json({ message: "Welcome, authenticated user!" });
    } catch (error: any) {
      res
        .status(500)
        .json({ msg: "Internal Server Error", err: error.message });
    }
  });
}
