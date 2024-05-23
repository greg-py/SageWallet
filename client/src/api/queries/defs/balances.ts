import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { getBalances } from "../../services";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";

export const balancesQuery = (
  userId: string,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => ({
  queryKey: ["balances", userId],
  queryFn: () => getBalances(userId, getAccessTokenSilently),
  enabled: !!userId,
});
