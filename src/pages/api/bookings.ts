import type { NextApiRequest, NextApiResponse } from "next";
import { Bookings } from "@/types/Bookings";

const recentBookingsMockData: Bookings[] = [
  {
    username: "John Deo",
    contact: "487512354",
    roomType: {
      type: "deluxe Room",
      name: "Deluxe",
      cost: 3000,
      shortDescription: "",
      image: "",
      capacity: 6,
    },
    checkIn: "2025-02-22T18:30:00.000Z",
    checkOut: "2025-02-26T18:30:00.000Z",
    status: "pending",
    noOfRooms: 1,
  },
  {
    username: "Jane Smith",
    contact: "4783565941",
    roomType: {
      type: "standard",
      name: "Standard room",
      cost: 2500,
      shortDescription: "",
      image: "",
      capacity: 4
    },
    checkIn: "2025-02-28T18:30:00.000Z",
    checkOut: "2025-03-04T18:30:00.000Z",
    status: "pending",
    noOfRooms: 2,
  },
  {
    username: "Johnny Lever",
    contact: "78459523366",
    roomType: {
      type: "tent",
      name: "Tent Stay",
      cost: 1500,
      shortDescription: "",
      image: "",
      capacity: 2
    },
    checkIn: "2025-02-24T18:30:00.000Z",
    checkOut: "2025-02-25T18:30:00.000Z",
    status: "confirmed",
    noOfRooms: 1,
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bookings[]>
) {
  res.status(200).json(recentBookingsMockData);
}
