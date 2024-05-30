import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";
import { getTeamMember } from "../../services";

export const teamMemberQuery = (
  userId: string,
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | GetTokenSilentlyVerboseResponse>
) => ({
  queryKey: ["team-member", userId],
  queryFn: () => getTeamMember(userId, getAccessTokenSilently),
  enabled: !!userId,
});
