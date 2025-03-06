import { getUsersApi } from "@/services/UsersService";
import { Users } from "@/types/UsersTypes";
import { create } from "zustand";

interface UsersState {
  users: Users[];
  isLoading: boolean;
  error: string;
  fetchUsers: () => void;
}

const useUsersStore = create<UsersState>()((set) => {
  return {
    users: [],
    isLoading: false,
    error: "",
    fetchUsers: async () => {
      set({ isLoading: true });
      const { data, error } = await getUsersApi();
      set({ users: data, error, isLoading: false });
    },
  };
});

export default useUsersStore;
