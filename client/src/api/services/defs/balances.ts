import { API_BASE_URL } from "../../../config/constants";
import { BalancesCategory } from "../../../models/balances";

export const getBalances = async (
  userId: string
): Promise<BalancesCategory[]> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/balances`);
  const data = await response.json();
  return data;
};

export const addBalance = async (userId: string, balance: BalancesCategory) => {
  if (!userId || !balance) {
    return {};
  } else if (userId !== balance.userId) {
    return {};
  }

  const response = await fetch(`${API_BASE_URL}/users/${userId}/balances`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(balance),
  });
  const data = await response.json();
  return data;
};

export const updateBalance = async (
  userId: string,
  balance: BalancesCategory
) => {
  if (!userId || !balance) {
    return {};
  } else if (userId !== balance.userId) {
    return {};
  }

  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/balances/${balance.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(balance),
    }
  );
  const data = await response.json();
  return data;
};

export const deleteBalance = async (userId: string, balanceId: string) => {
  if (!userId || !balanceId) {
    return {};
  }

  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/balances/${balanceId}`,
    { method: "DELETE" }
  );
  const data = await response.json();
  return data;
};
