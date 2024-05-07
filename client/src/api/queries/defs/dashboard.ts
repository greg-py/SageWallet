import { getDashboard } from "../../services";

export const dashboardQuery = (
  userId: string,
  filterMonth: number,
  filterYear: number
) => ({
  queryKey: ["dashboard"],
  queryFn: () => getDashboard(userId, filterMonth, filterYear),
});
