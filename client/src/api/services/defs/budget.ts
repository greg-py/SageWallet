import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { API_BASE_URL } from "../../../config/constants";
import { BudgetCategory } from "../../../models/budget";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";

export const getBudget = async (
  userId: string,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
): Promise<BudgetCategory[]> => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/budgets`;
  const headers = { Authorization: `Bearer ${token}` };
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data;
};

export const addBudget = async (
  userId: string,
  budget: BudgetCategory,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/budgets`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(budget),
  });
  const data = await response.json();
  return data;
};

export const updateBudget = async (
  userId: string,
  budget: BudgetCategory,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/budgets/${budget.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(budget),
  });
  const data = await response.json();
  return data;
};

export const deleteBudget = async (
  userId: string,
  budgetId: string,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/budgets/${budgetId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, { method: "DELETE", headers });
  const data = await response.json();
  return data;
};
