import { API_BASE_URL } from "../../../config/constants";
import { BudgetCategory } from "../../../models/budget";

export const getBudget = async (userId: string): Promise<BudgetCategory[]> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/budgets`);
  const data = await response.json();
  return data;
};

export const addBudget = async (userId: string, budget: BudgetCategory) => {
  if (!userId || !budget) {
    return {};
  } else if (userId !== budget.userId) {
    return {};
  }

  const response = await fetch(`${API_BASE_URL}/users/${userId}/budgets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(budget),
  });
  const data = await response.json();
  return data;
};

export const updateBudget = async (userId: string, budget: BudgetCategory) => {
  if (!userId || !budget) {
    return {};
  } else if (userId !== budget.userId) {
    return {};
  }

  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/budgets/${budget.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budget),
    }
  );
  const data = await response.json();
  return data;
};

export const deleteBudget = async (userId: string, budgetId: string) => {
  if (!userId || !budgetId) {
    return {};
  }

  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/budgets/${budgetId}`,
    { method: "DELETE" }
  );
  const data = await response.json();
  return data;
};
