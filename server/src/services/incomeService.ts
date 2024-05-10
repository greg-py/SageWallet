import incomeRepository from "../repository/incomeRepository";
import { getUTCDateRange } from "../utils/dates";

const getUserIncome = async (userId: string, month: string, year: string) => {
  // Use month and year query parameters to build date range for query
  const { startDate, endDate } = getUTCDateRange(year, month);

  // Fetch income from database
  const rawIncome = await incomeRepository.findIncomeByUserId(
    userId,
    startDate,
    endDate
  );

  // TODO: Map raw income data to formatted income class

  return rawIncome;
};

const addUserIncome = async (userId: string, income: any) => {
  return await incomeRepository.addIncomeByUserId(userId, income);
};

const updateUserIncome = async (
  userId: string,
  incomeId: string,
  income: any
) => {
  // TODO: Map income data from request to database income model

  return await incomeRepository.updateIncomeByIncomeId(
    userId,
    incomeId,
    income
  );
};

const deleteUserIncome = async (userId: string, incomeId: string) => {
  return await incomeRepository.deleteIncomeByIncomeId(userId, incomeId);
};

export default {
  getUserIncome,
  addUserIncome,
  updateUserIncome,
  deleteUserIncome,
};
