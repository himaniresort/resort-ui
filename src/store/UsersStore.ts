import { getUsersApi } from "@/services/UsersService";
import { Users } from "@/types/Users";
import { create } from "zustand";

interface UsersState {
  users: Users[];
  isLoading: boolean;
  error: string|null;
  fetchUsers: () => void;
  updateUser: (name: string) => void;
}

const useUsersStore = create<UsersState>()((set) => {
  return {
    users: [],
    isLoading: false,
    error: null,
    fetchUsers: async () => {
      set({ isLoading: true });
      const { data, error } = await getUsersApi();
      set({ users: data, error, isLoading: false });
    },
    updateUser: async (name: string) => {
      console.log(name)
    }
  };
});

export default useUsersStore;
