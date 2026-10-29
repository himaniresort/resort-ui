import axios from "axios";
import { BookingPayload, CreatedBooking } from "@/types/Bookings";

export const createBooking = async (
  bookingPayload: BookingPayload,
): Promise<CreatedBooking> => {
  const { userData, bookingData } = bookingPayload;
  const userResponse = await axios.post<{ userId?: string }>(
    "/api/users",
    userData,
  );

  const userId = userResponse.data.userId;
  if (!userId) {
    throw new Error("User ID not returned");
  }

  const bookingResponse = await axios.post<CreatedBooking>("/api/bookings", {
    ...bookingData,
    userId,
  });
  return bookingResponse.data;
};
