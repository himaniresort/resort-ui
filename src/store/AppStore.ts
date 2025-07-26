import { PAGES } from "@/constants/constants";
import { create } from "zustand";

interface AppState {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const useAppStore = create<AppState>()((set) => {
  return {
    currentPage: PAGES.HOME,
    setCurrentPage: async (page: string) => {
      set({ currentPage: page });
    },
  };
});

export default useAppStore;
