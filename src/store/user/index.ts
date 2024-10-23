import { create } from "zustand";
import { updateUser } from "./actions";
import { IUser, UserStore } from "./types";

export const useUserStore = create<UserStore>((set) => ({
  // State
  user: {
    email: "",
  },
  transactions: [],
  // Actions
  updateUser: (user: Partial<IUser>) => updateUser(user, set),
  setTransactions: (transactions) => set({ transactions }),
}));
