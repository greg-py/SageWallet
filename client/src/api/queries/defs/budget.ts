import { getBudget } from "../../services";

export const budgetQuery = (userId: string) => ({
  queryKey: ["budget", userId],
  queryFn: () => getBudget(userId),
  enabled: !!userId,
});
