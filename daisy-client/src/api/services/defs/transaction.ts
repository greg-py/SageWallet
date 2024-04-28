import { Transaction } from "../../../models/transaction";
import { API_BASE_URL } from "../../../config/constants";

export const getTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/transactions`);
  const data = await response.json();
  return data;
};

export const addTransaction = async (
  userId: string,
  transaction: Transaction
) => {
  if (!userId || !transaction) {
    return {};
  } else if (userId !== transaction.userId) {
    return {};
  }

  const response = await fetch(`${API_BASE_URL}/users/${userId}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  const data = await response.json();
  return data;
};

export const updateTransaction = async (
  userId: string,
  transaction: Transaction
) => {
  if (!userId || !transaction) {
    return {};
  } else if (userId !== transaction.userId) {
    return {};
  }

  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/transactions/${transaction.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    }
  );
  const data = await response.json();
  return data;
};

export const deleteTransaction = async (
  userId: string,
  transactionId: string
) => {
  if (!userId || !transactionId) {
    return {};
  }

  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/transactions/${transactionId}`,
    { method: "DELETE" }
  );
  const data = await response.json();
  return data;
};
