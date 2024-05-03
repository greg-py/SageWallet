import { getBudget } from "../../services";

export const budgetQuery = (
  userId: string,
  filterMonth: number,
  filterYear: number
) => ({
  queryKey: ["budget"],
  queryFn: () => getBudget(userId, filterMonth, filterYear),
});
