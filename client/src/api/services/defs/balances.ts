import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { API_BASE_URL } from "../../../config/constants";
import { BalancesCategory } from "../../../models/balances";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";

export const getBalances = async (
  userId: string,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
): Promise<BalancesCategory[]> => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/balances`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    headers,
  });
  const data = await response.json();
  return data;
};

export const addBalance = async (
  userId: string,
  balance: BalancesCategory,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/balances`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(balance),
  });
  const data = await response.json();
  return data;
};

export const updateBalance = async (
  userId: string,
  balance: BalancesCategory,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/balances/${balance.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(balance),
  });
  const data = await response.json();
  return data;
};

export const deleteBalance = async (
  userId: string,
  balanceId: string,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/balances/${balanceId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, { method: "DELETE", headers });
  const data = await response.json();
  return data;
};
