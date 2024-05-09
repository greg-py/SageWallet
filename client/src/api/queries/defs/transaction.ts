import { getTransactions } from "../../services";

export const transactionsQuery = (
  userId: string,
  filterMonth: number,
  filterYear: number
) => ({
  queryKey: ["transactions", userId, filterMonth, filterYear],
  queryFn: () => getTransactions(userId, filterMonth, filterYear),
  enabled: !!userId && !!filterMonth && !!filterYear,
});
