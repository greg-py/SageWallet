export const getTransactions = async (userId?: string) => {
  if (!userId) {
    return [];
  } else {
    const response = await fetch(
      `http://localhost:3000/api/users/${userId}/transactions`
    );
    const data = await response.json();
    return data;
  }
};

export const deleteTransaction = async (
  userId: string,
  transactionId: string
) => {
  const response = await fetch(
    `http://localhost:3000/api/users/${userId}/transactions/${transactionId}`,
    { method: "DELETE" }
  );
  const data = await response.json();
  return data;
};
