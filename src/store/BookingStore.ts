import { createBooking } from "@/services/BookingService";
import { BookingPayload, Bookings, CreatedBooking } from "@/types/Bookings";
import axios from "axios";
import { create } from "zustand";

interface BookingState {
  bookings: Bookings[];
  fetchBooking: () => void;
  createBooking: (bookingPayload: BookingPayload) => Promise<CreatedBooking>;
  isLoading: boolean;
  error: string | null;
}

const useBookingStore = create<BookingState>()((set) => {
  return {
    bookings: [],
    fetchBooking: async () => {
      try {
        const response = await axios.get("/api/bookings");
        const { data } = response.data;
        set({ bookings: data });
      } catch (error) {
        console.log(error);
      }
    },
    isLoading: false,
    error: null,
    createBooking: async (bookingPayload: BookingPayload) => {
      set({ isLoading: true, error: null });
      try {
        const createdBooking = await createBooking(bookingPayload);
        set({ isLoading: false });
        return createdBooking;
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Error creating booking";
        set({ error: message, isLoading: false });
        throw error;
      }
    },
  };
});

export default useBookingStore;
