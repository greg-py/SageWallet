import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";
import { getTransactions } from "../../services";

export const transactionsQuery = (
  userId: string,
  filterMonth: number,
  filterYear: number,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => ({
  queryKey: ["transactions", userId, filterMonth, filterYear],
  queryFn: () =>
    getTransactions(userId, filterMonth, filterYear, getAccessTokenSilently),
  enabled: !!userId && !!filterMonth && !!filterYear,
});
