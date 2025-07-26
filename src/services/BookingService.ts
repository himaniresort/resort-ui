import axios from "axios";
import { BookingData } from "@/types/Bookings";

export const createBooking = async (bookingData: BookingData) => {
  try {
    const response = await axios.post("/api/booking", bookingData);
    if (response.status === 200) {
      return { data: response.data, error: "" };
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    return { errorMessage: "Error creating booking" };
  }
};
