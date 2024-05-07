import { API_BASE_URL } from "../../../config/constants";
import { DashboardData } from "../../../models/dashboard";

export const getDashboard = async (
  userId: string,
  filterMonth: number,
  filterYear: number
): Promise<DashboardData> => {
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/dashboard?month=${filterMonth}&year=${filterYear}`
  );
  const data = await response.json();
  return data;
};
