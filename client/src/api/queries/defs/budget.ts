import { getBudget } from "../../services";

export const budgetQuery = (userId: string) => ({
  queryKey: ["budget"],
  queryFn: () => getBudget(userId),
});
