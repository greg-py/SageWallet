import { getFilterOptions } from "../../services";
import { User } from "firebase/auth";

export const filterOptionsQuery = (user: User, token: string) => ({
  queryKey: ["filter-options", user?.uid],
  queryFn: () => getFilterOptions(user, token),
  enabled: !!user && !!token,
});
