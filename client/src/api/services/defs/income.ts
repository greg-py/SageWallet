import { API_BASE_URL } from "../../../config/constants";
import { Income } from "../../../models/income";

export const getIncome = async (
  userId: string,
  filterMonth: number,
  filterYear: number
): Promise<Income[]> => {
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/income?month=${filterMonth}&year=${filterYear}`
  );
  const data = await response.json();
  return data;
};

export const addIncome = async (userId: string, income: Income) => {
  if (!userId || !income) {
    return {};
  } else if (userId !== income.userId) {
    return {};
  }

  const response = await fetch(`${API_BASE_URL}/users/${userId}/income`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(income),
  });
  const data = await response.json();
  return data;
};

export const updateIncome = async (userId: string, income: Income) => {
  if (!userId || !income) {
    return {};
  } else if (userId !== income.userId) {
    return {};
  }

  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/income/${income.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(income),
    }
  );
  const data = await response.json();
  return data;
};

export const deleteIncome = async (userId: string, incomeId: string) => {
  if (!userId || !incomeId) {
    return {};
  }

  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/income/${incomeId}`,
    { method: "DELETE" }
  );
  const data = await response.json();
  return data;
};
