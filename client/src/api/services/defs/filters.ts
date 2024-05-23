import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { API_BASE_URL } from "../../../config/constants";
import { FilterOptions } from "../../../models/filters";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";

export const getFilterOptions = async (
  userId: string,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
): Promise<FilterOptions> => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/filters`;
  const headers = { Authorization: `Bearer ${token}` };
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data;
};
