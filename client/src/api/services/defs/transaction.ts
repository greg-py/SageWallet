import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { Transaction } from "../../../models/transaction";
import { API_BASE_URL } from "../../../config/constants";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";

export const getTransactions = async (
  userId: string,
  filterMonth: number,
  filterYear: number,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
): Promise<Transaction[]> => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/transactions?month=${filterMonth}&year=${filterYear}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data;
};

export const addTransaction = async (
  userId: string,
  transaction: Transaction,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/transactions`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(transaction),
  });
  const data = await response.json();
  return data;
};

export const updateTransaction = async (
  userId: string,
  transaction: Transaction,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/transactions/${transaction.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(transaction),
  });
  const data = await response.json();
  return data;
};

export const deleteTransaction = async (
  userId: string,
  transactionId: string,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/transactions/${transactionId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, { method: "DELETE", headers });
  const data = await response.json();
  return data;
};
