import { User } from "firebase/auth";
import { apiRequest } from "..";

export const createTeamOrReturnInvitation = async (user: User) => {
  const endpoint = `/users/${user.uid}/team`;
  const body = { email: user.email };
  return apiRequest({ user, endpoint, method: "POST", body });
};
