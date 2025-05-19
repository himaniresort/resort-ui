import { getRoomsApi } from "@/services/RoomsServices";
import { Room } from "@/types/Rooms";
import { create } from "zustand";

interface RoomsState {
    roomsData: Room[],
    isLoading: boolean;
    error: string|null;
    fetchRooms: () => void;
}

const useRoomsStore = create<RoomsState>()((set) => {
    return {
        roomsData: [],
        isLoading: false,
        error: null,
        fetchRooms: async () => {
            set({ isLoading: true });
            const { data, error } = await getRoomsApi();
            set({ roomsData: data, error, isLoading: false });
        }
    }
});

export default useRoomsStore;