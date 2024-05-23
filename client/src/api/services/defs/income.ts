import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { API_BASE_URL } from "../../../config/constants";
import { Income } from "../../../models/income";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";

export const getIncome = async (
  userId: string,
  filterMonth: number,
  filterYear: number,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
): Promise<Income[]> => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/income?month=${filterMonth}&year=${filterYear}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data;
};

export const addIncome = async (
  userId: string,
  income: Income,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/income`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(income),
  });
  const data = await response.json();
  return data;
};

export const updateIncome = async (
  userId: string,
  income: Income,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/income/${income.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(income),
  });
  const data = await response.json();
  return data;
};

export const deleteIncome = async (
  userId: string,
  incomeId: string,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/income/${incomeId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, { method: "DELETE", headers });
  const data = await response.json();
  return data;
};
