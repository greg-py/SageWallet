import { BalancesCategory } from "../../../models/balances";
import { User } from "firebase/auth";
import { apiRequest } from "..";

export const getBalances = async (
  user: User,
  token: string
): Promise<BalancesCategory[]> => {
  const endpoint = `/users/${user.uid}/balances`;
  return apiRequest({ user, endpoint, method: "GET", token });
};

export const addBalance = async (user: User, balance: BalancesCategory) => {
  const endpoint = `/users/${user.uid}/balances`;
  return apiRequest({ user, endpoint, method: "POST", body: balance });
};

export const updateBalance = async (user: User, balance: BalancesCategory) => {
  const endpoint = `/users/${user.uid}/balances/${balance.id}`;
  return apiRequest({ user, endpoint, method: "PUT", body: balance });
};

export const deleteBalance = async (user: User, balanceId: string) => {
  const endpoint = `/users/${user.uid}/balances/${balanceId}`;
  return apiRequest({ user, endpoint, method: "DELETE" });
};
