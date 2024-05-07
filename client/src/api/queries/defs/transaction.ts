import { getTransactions } from "../../services";

export const transactionsQuery = (
  userId: string,
  filterMonth: number,
  filterYear: number
) => ({
  queryKey: ["transactions"],
  queryFn: () => getTransactions(userId, filterMonth, filterYear),
});
