import { getBalances } from "../../services";

export const balancesQuery = (userId: string) => ({
  queryKey: ["balances", userId],
  queryFn: () => getBalances(userId),
  enabled: !!userId,
});
