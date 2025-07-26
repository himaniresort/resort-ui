import { createBooking } from "@/services/BookingService";
import { BookingData, Bookings } from "@/types/Bookings";
import axios from "axios";
import { create } from "zustand";

interface BookingState {
  bookings: Bookings[];
  fetchBooking: () => void;
  createBooking: (booking: BookingData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

interface ErrorMessage {
  errorMessage: string;
}

const useBookingStore = create<BookingState>()((set) => {
  return {
    bookings: [],
    fetchBooking: async () => {
      try {
        const response = await axios.get("/api/bookings");
        const data = response.data;
        set({ bookings: data });
      } catch (error) {
        console.log(error);
      }
    },
    isLoading: false,
    error: null,
    createBooking: async (booking) => {
      set({ isLoading: true, error: null });
      try {
        const response = await createBooking(booking);
        set((state) => ({
          bookings: [...state.bookings, response.data],
          isLoading: false,
        }));
      } catch (error: unknown) {
        set({ error: (error as ErrorMessage).errorMessage, isLoading: false });
      }
    },
  };
});

export default useBookingStore;
