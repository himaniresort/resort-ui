import { getRoomTypeApi } from "@/services/RoomTypeServices";
import { RoomType } from "@/types/RoomType";
import { create } from "zustand";

interface RoomTypeState {
    roomTypeData: RoomType[],
    isLoading: boolean;
    error: string;
    fetchRoomType: () => void;
}

const useRoomTypeStore = create<RoomTypeState>()((set) => {
    return {
        roomTypeData: [],
        isLoading: false,
        fetchRoomType: async () => {
            set({ isLoading: true });
            const { data, error } = await getRoomTypeApi();
            set({ roomTypeData: data, error, isLoading: false });
        }
    }
});

export default useRoomTypeStore;