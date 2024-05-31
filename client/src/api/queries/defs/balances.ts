import { User } from "firebase/auth";
import { getBalances } from "../../services";

export const balancesQuery = (user: User, token: string) => ({
  queryKey: ["balances", user.uid],
  queryFn: () => getBalances(user, token),
  enabled: !!user && !!token,
});
