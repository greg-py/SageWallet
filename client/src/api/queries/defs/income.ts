import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { getIncome } from "../../services/defs/income";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";

export const incomeQuery = (
  userId: string,
  filterMonth: number,
  filterYear: number,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => ({
  queryKey: ["income", userId, filterMonth, filterYear],
  queryFn: () =>
    getIncome(userId, filterMonth, filterYear, getAccessTokenSilently),
  enabled: !!userId && !!filterMonth && !!filterYear,
});
