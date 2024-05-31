import { User } from "firebase/auth";
import { getBudget } from "../../services";

export const budgetQuery = (user: User, token: string) => ({
  queryKey: ["budget", user.uid],
  queryFn: () => getBudget(user, token),
  enabled: !!user && !!token,
});
