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
            const { data, error }: {data: RoomType[], error: string} = await getRoomTypeApi();
            set({ roomTypeData: data.sort((a, b) => b.cost - a.cost), error, isLoading: false });
        }
    }
});

export default useRoomTypeStore;