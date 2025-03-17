import { RoomType } from "./RoomType";

export interface RoomStatus {
    description: string
}

export interface Room {
    roomNo: string,
    roomType: RoomType,
    status: RoomStatus,
    bookingId: string | null;
}