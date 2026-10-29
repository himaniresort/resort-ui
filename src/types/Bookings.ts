import { Dayjs } from "dayjs";
import { RoomType } from "./RoomType";

export type BookingStatus = "confirmed" | "pending";

export interface Bookings {
  userName: string;
  userContact: string;
  contact: string;
  roomType: RoomType;
  rooms: number;
  guests: number;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  roomName: string;
  bookingReferenceId: string;
}

export interface UserData {
  name: string;
  email: string;
  dob: Dayjs | null;
  phone: string;
  location: string;
  pinCode: string;
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  roomTypeId: string | undefined;
  bookingReferenceId: string;
}

export interface BookingPayload {
  userData: UserData;
  bookingData: BookingData;
}

export interface CreatedBooking extends BookingData {
  _id: string;
  userId: string;
}
