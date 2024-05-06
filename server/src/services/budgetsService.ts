import budgetsRepository from "../repository/budgetsRepository";

const getUserBudgets = async (userId: string) => {
  const budget = await budgetsRepository.findBudgetsByUserId(userId);
  budget.sort((a, b) => b.budget - a.budget);
  return budget;
};

const addUserBudgets = async (userId: string, budget: any) => {
  return await budgetsRepository.addBudgetByUserId(userId, budget);
};

const updateUserBudget = async (
  userId: string,
  budgetId: string,
  budget: any
) => {
  return await budgetsRepository.updateBudgetByUserId(userId, budgetId, budget);
};

const deleteUserBudget = async (userId: string, budgetId: string) => {
  return await budgetsRepository.deleteBudgetByBudgetId(userId, budgetId);
};

export default {
  getUserBudgets,
  addUserBudgets,
  updateUserBudget,
  deleteUserBudget,
};
