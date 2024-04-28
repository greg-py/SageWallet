import budgetsRepository from "../repository/budgetsRepository";

const getUserBudgets = async (userId: string) => {
  const budget = await budgetsRepository.findBudgetsByUserId(userId);
  budget.sort((a, b) => b.budget - a.budget);
  return budget;
};

const addUserBudgets = async (userId: string, budget: any) => {
  return await budgetsRepository.addBudgetByUserId(userId, budget);
};

export default {
  getUserBudgets,
  addUserBudgets,
};
