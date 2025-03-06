import type { NextApiRequest, NextApiResponse } from "next";
import { Bookings } from "@/types/BookingsTypes";

const recentBookingsMockData: Bookings[] = [
  {
    username: "John Deo",
    contact: "487512354",
    roomType: "tent",
    checkIn: "2025-02-22T18:30:00.000Z",
    checkOut: "2025-02-26T18:30:00.000Z",
    status: "pending",
    noOfRooms: 1,
  },
  {
    username: "Jane Smith",
    contact: "4783565941",
    roomType: "premiumHut",
    checkIn: "2025-02-28T18:30:00.000Z",
    checkOut: "2025-03-04T18:30:00.000Z",
    status: "pending",
    noOfRooms: 2,
  },
  {
    username: "Johnny Lever",
    contact: "78459523366",
    roomType: "hut",
    checkIn: "2025-02-24T18:30:00.000Z",
    checkOut: "2025-02-25T18:30:00.000Z",
    status: "confirmed",
    noOfRooms: 1,
  },
  {
    username: "James Bond",
    contact: "78459526",
    roomType: "premiumHut",
    checkIn: "2025-03-05T18:30:00.000Z",
    checkOut: "2025-03-07T18:30:00.000Z",
    status: "confirmed",
    noOfRooms: 1,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bookings[]>
) {
  res.status(200).json(recentBookingsMockData);
}
