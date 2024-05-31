import { User } from "firebase/auth";

export const getToken = async (user: User) => {
  return await user.getIdToken();
};
