import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";
import { API_BASE_URL } from "../../../config/constants";
import { TeamMember } from "../../../models/teamMember";

export const getTeamMember = async (
  userId: string,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
): Promise<TeamMember> => {
  const token = await getAccessTokenSilently();
  const url = `${API_BASE_URL}/users/${userId}/team-members`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data;
};
