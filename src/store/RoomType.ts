import { getRoomTypeApi } from "@/services/RoomTypeServices";
import { RoomType } from "@/types/RoomType";
import { create } from "zustand";

interface RoomTypeState {
    roomTypeData: RoomType[],
    isLoading: boolean;
    error: string|null;
    fetchRoomType: () => void;
}

const useRoomTypeStore = create<RoomTypeState>()((set) => {
    return {
        roomTypeData: [],
        isLoading: false,
        error: null,
        fetchRoomType: async () => {
            set({ isLoading: true });
            const { data, error } = await getRoomTypeApi();
            set({ roomTypeData: data, error, isLoading: false });
        }
    }
});

export default useRoomTypeStore;