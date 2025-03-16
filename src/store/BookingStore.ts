import { Bookings } from "@/types/BookingsTypes";
import axios from "axios";
import { create } from "zustand";

interface BookingState {
    bookings: Bookings[],
    fetchBooking: () => void;
}

const useBookingStore = create<BookingState>()((set) => {
    return {
        bookings: [],
        fetchBooking: async () => {
            try {
                const response = await axios.get("/api/bookings");
                const data = response.data;
                set({ bookings: data});
              } catch (error) {
                console.log(error)
              }
        }
    }
});

export default useBookingStore;