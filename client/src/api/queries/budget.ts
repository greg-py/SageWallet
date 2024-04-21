import { getBudget } from "../budget";

export const budgetQuery = (userId: string) => ({
  queryKey: ["budget"],
  queryFn: () => getBudget(userId),
});
