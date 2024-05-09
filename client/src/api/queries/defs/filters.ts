import { getFilterOptions } from "../../services";

export const filterOptionsQuery = (userId: string) => ({
  queryKey: ["filter-options", userId],
  queryFn: () => getFilterOptions(userId),
  enabled: !!userId,
});
