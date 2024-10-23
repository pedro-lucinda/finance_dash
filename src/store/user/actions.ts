import { ISetUserStore, IUser } from "./types";

export function updateUser(user: Partial<IUser>, set: ISetUserStore) {
  set((state) => ({ user: { ...state.user, ...user } }));
}
