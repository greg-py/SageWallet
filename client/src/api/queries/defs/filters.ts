import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { getFilterOptions } from "../../services";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";

export const filterOptionsQuery = (
  userId: string,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => ({
  queryKey: ["filter-options", userId],
  queryFn: () => getFilterOptions(userId, getAccessTokenSilently),
  enabled: !!userId,
});
