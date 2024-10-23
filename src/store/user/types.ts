import { StoreApi } from "zustand";

export type IUser = { email: string };

export type ITransaction = {
  date: number;
  amount: string;
  transaction_type: string;
  currency: string;
  account: string;
  industry: string;
  state: string;
};

export interface IState {
  user: IUser;
  transactions: ITransaction[];
}

export interface IActions {
  updateUser: (user: Partial<IUser>) => void;

  setTransactions: (transactions: ITransaction[]) => void;
}

export type UserStore = IState & IActions;

export type ISetUserStore = StoreApi<IState>["setState"];
export type IGetUserStore = StoreApi<IState>["getState"];
