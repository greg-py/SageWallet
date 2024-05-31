import { User } from "firebase/auth";
import { getToken } from "../../services";

export const tokenQuery = (user: User) => ({
  queryKey: ["token", user?.uid],
  queryFn: () => getToken(user),
  enabled: !!user,
});
