import { API_BASE_URL } from "../../../config/constants";
import { FilterOptions } from "../../../models/filters";

export const getFilterOptions = async (
  userId: string
): Promise<FilterOptions> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/filters`);
  const data = await response.json();
  return data;
};
