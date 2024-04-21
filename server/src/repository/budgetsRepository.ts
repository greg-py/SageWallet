import Budget from "../models/budget";

const findBudgetsByUserId = async (userId: string) => {
  try {
    const budgets = await Budget.findAll({
      where: { user_id: userId },
    });
    return budgets;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when fetching budgets: " + error.message);
    }
    return [];
  }
};

const addBudgetByUserId = async (userId: string, budget: any) => {
  try {
    return await Budget.create({
      category: budget.category,
      budget: budget.budget,
      user_id: userId,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when inserting budget: " + error.message);
    }
  }
};

export default {
  findBudgetsByUserId,
  addBudgetByUserId,
};
