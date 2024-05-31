import { Transaction } from "../../../models/transaction";
import { User } from "firebase/auth";
import { apiRequest } from "..";

export const getTransactions = async (
  user: User,
  filterMonth: number,
  filterYear: number,
  token: string
): Promise<Transaction[]> => {
  const endpoint = `/users/${user.uid}/transactions?month=${filterMonth}&year=${filterYear}`;
  return apiRequest({ user, endpoint, method: "GET", token });
};

export const addTransaction = async (user: User, transaction: Transaction) => {
  const endpoint = `/users/${user.uid}/transactions`;
  return apiRequest({ user, endpoint, method: "POST", body: transaction });
};

export const updateTransaction = async (
  user: User,
  transaction: Transaction
) => {
  const endpoint = `/users/${user.uid}/transactions/${transaction.id}`;
  return apiRequest({ user, endpoint, method: "PUT", body: transaction });
};

export const deleteTransaction = async (user: User, transactionId: string) => {
  const endpoint = `/users/${user.uid}/transactions/${transactionId}`;
  return apiRequest({ user, endpoint, method: "DELETE" });
};
