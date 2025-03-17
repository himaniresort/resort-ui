import { RoomType } from "./RoomType";

export type BookingStatus = "confirmed" | "pending";

export interface Bookings {
  username: string;
  contact: string;
  roomType: RoomType;
  noOfRooms: number;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
}