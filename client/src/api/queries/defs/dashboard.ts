import { getDashboard, getFilterOptions } from "../../services";

export const dashboardQuery = (
  userId: string,
  filterMonth: number,
  filterYear: number
) => ({
  queryKey: ["dashboard"],
  queryFn: () => getDashboard(userId, filterMonth, filterYear),
});

export const filterOptionsQuery = (userId: string) => ({
  queryKey: ["filter-options"],
  queryFn: () => getFilterOptions(userId),
});
