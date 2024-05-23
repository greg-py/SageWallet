import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { getBudget } from "../../services";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";

export const budgetQuery = (
  userId: string,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => ({
  queryKey: ["budget", userId],
  queryFn: () => getBudget(userId, getAccessTokenSilently),
  enabled: !!userId,
});
