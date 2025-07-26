import { create } from "zustand";

interface GuestsAndRooms {
  guests: number;
  setGuests: (guests: number) => void;
  rooms: number;
  setRooms: (rooms: number) => void;
}

export const useGuestsAndRoomsStore = create<GuestsAndRooms>()((set) => ({
  guests: 1,
  setGuests: (guests) => set({ guests }),
  rooms: 1,
  setRooms: (rooms) => set({ rooms }),
}));
