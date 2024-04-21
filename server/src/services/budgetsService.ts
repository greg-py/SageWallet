import budgetsRepository from "../repository/budgetsRepository";

const getUserBudgets = async (userId: string) => {
  return await budgetsRepository.findBudgetsByUserId(userId);
};

const addUserBudgets = async (userId: string, budget: any) => {
  return await budgetsRepository.addBudgetByUserId(userId, budget);
};

export default {
  getUserBudgets,
  addUserBudgets,
};
