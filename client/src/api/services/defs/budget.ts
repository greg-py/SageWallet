import { BudgetCategory } from "../../../models/budget";
import { User } from "firebase/auth";
import { apiRequest } from "..";

export const getBudget = async (
  user: User,
  token: string
): Promise<BudgetCategory[]> => {
  const endpoint = `/users/${user.uid}/budgets`;
  return apiRequest({ user, endpoint, method: "GET", token });
};

export const addBudget = async (user: User, budget: BudgetCategory) => {
  const endpoint = `/users/${user.uid}/budgets`;
  return apiRequest({ user, endpoint, method: "POST", body: budget });
};

export const updateBudget = async (user: User, budget: BudgetCategory) => {
  const endpoint = `/users/${user.uid}/budgets/${budget.id}`;
  return apiRequest({ user, endpoint, method: "PUT", body: budget });
};

export const deleteBudget = async (user: User, budgetId: string) => {
  const endpoint = `/users/${user.uid}/budgets/${budgetId}`;
  return apiRequest({ user, endpoint, method: "DELETE" });
};
