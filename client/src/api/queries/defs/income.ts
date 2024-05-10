import { getIncome } from "../../services/defs/income";

export const incomeQuery = (
  userId: string,
  filterMonth: number,
  filterYear: number
) => ({
  queryKey: ["income", userId, filterMonth, filterYear],
  queryFn: () => getIncome(userId, filterMonth, filterYear),
  enabled: !!userId && !!filterMonth && !!filterYear,
});
