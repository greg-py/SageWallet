import { getTransactions } from "../../services";
import { User } from "firebase/auth";

export const transactionsQuery = (
  user: User,
  filterMonth: number,
  filterYear: number,
  token: string
) => ({
  queryKey: ["transactions", user.uid, filterMonth, filterYear],
  queryFn: () => getTransactions(user, filterMonth, filterYear, token),
  enabled: !!user && !!filterMonth && !!filterYear && !!token,
});
