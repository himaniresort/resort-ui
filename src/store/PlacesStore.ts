import { getPlacesApi } from "@/services/PlacesServices";
import { Places } from "@/types/Places";
import { create } from "zustand";

interface PlacesState {
    placesData: Places[],
    isLoading: boolean;
    error: string|null;
    fetchPlaces: () => void;
}

const usePlacesStore = create<PlacesState>()((set) => {
    return {
        placesData: [],
        isLoading: false,
        error: null,
        fetchPlaces: async () => {
            set({ isLoading: true });
            const { data, error } = await getPlacesApi();
            set({ placesData: data, error, isLoading: false });
        }
    }
});

export default usePlacesStore;