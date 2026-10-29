import bookingsHandler from "../bookings";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return bookingsHandler(req, res);
}
