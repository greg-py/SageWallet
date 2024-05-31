import { Income } from "../../../models/income";
import { User } from "firebase/auth";
import { apiRequest } from "..";

export const getIncome = async (
  user: User,
  filterMonth: number,
  filterYear: number,
  token: string
): Promise<Income[]> => {
  const endpoint = `/users/${user.uid}/income?month=${filterMonth}&year=${filterYear}`;
  return apiRequest({ user, endpoint, method: "GET", token });
};

export const addIncome = async (user: User, income: Income) => {
  const endpoint = `/users/${user.uid}/income`;
  return apiRequest({ user, endpoint, method: "POST", body: income });
};

export const updateIncome = async (user: User, income: Income) => {
  const endpoint = `/users/${user.uid}/income/${income.id}`;
  return apiRequest({ user, endpoint, method: "PUT", body: income });
};

export const deleteIncome = async (user: User, incomeId: string) => {
  const endpoint = `/users/${user.uid}/income/${incomeId}`;
  return apiRequest({ user, endpoint, method: "DELETE" });
};
