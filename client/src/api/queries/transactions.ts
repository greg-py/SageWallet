import { getTransactions } from "../transactions";

export const transactionsQuery = (userId: string) => ({
  queryKey: ["transactions"],
  queryFn: () => getTransactions(userId),
});
