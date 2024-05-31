import { getIncome } from "../../services/defs/income";
import { User } from "firebase/auth";

export const incomeQuery = (
  user: User,
  filterMonth: number,
  filterYear: number,
  token: string
) => ({
  queryKey: ["income", user.uid, filterMonth, filterYear],
  queryFn: () => getIncome(user, filterMonth, filterYear, token),
  enabled: !!user && !!filterMonth && !!filterYear && !!token,
});
