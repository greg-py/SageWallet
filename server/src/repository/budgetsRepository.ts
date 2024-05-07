import Budget from "../models/budget";

const findBudgetsByUserId = async (userId: string) => {
  try {
    const budgets = await Budget.findAll({
      where: { user_id: userId },
      order: [
        ["budget", "DESC"],
        ["category", "DESC"],
      ],
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

const updateBudgetByUserId = async (
  userId: string,
  budgetId: string,
  budget: any
) => {
  try {
    return await Budget.update(
      {
        category: budget.category,
        budget: budget.budget,
        user_id: budget.userId,
      },
      {
        where: { id: budgetId, user_id: userId },
        returning: true,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when updating budget: " + error.message);
    }
  }
};

const deleteBudgetByBudgetId = async (userId: string, budgetId: string) => {
  try {
    return await Budget.destroy({
      where: {
        id: budgetId,
        user_id: userId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when deleting budget: " + error.message);
    }
  }
};

export default {
  findBudgetsByUserId,
  addBudgetByUserId,
  updateBudgetByUserId,
  deleteBudgetByBudgetId,
};
