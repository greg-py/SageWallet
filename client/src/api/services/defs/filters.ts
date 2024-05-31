import { User } from "firebase/auth";
import { apiRequest } from "..";

export const getFilterOptions = async (user: User, token: string) => {
  const endpoint = `/users/${user.uid}/filters`;
  return apiRequest({ user, endpoint, method: "GET", token });
};
