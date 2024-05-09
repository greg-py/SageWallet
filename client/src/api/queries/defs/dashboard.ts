import { getDashboard } from "../../services";

export const dashboardQuery = (
  userId: string,
  filterMonth: number,
  filterYear: number
) => ({
  queryKey: ["dashboard", userId, filterMonth, filterYear],
  queryFn: () => getDashboard(userId, filterMonth, filterYear),
  enabled: !!userId,
});
