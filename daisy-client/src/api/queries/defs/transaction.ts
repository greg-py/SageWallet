import { getTransactions } from "../../services/defs/transaction";

export const transactionsQuery = (userId: string) => ({
  queryKey: ["transactions"],
  queryFn: () => getTransactions(userId),
});
