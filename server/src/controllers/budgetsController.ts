import { Request, Response } from "express";
import budgetsService from "../services/budgetsService";

const getUserBudgets = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const response = await budgetsService.getUserBudgets(userId);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch budgets" });
  }
};

const addUserBudgets = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const budget = req.body;
    const response = await budgetsService.addUserBudgets(userId, budget);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to add budget" });
  }
};

const updateUserBudget = async (req: Request, res: Response) => {
  try {
    const { userId, budgetId } = req.params;
    const budget = req.body;

    if (!userId || !budgetId || !budget) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    if (userId !== budget.userId || budgetId !== budget.id) {
      return res.status(400).send({ error: "ID mismatch" });
    }

    const response = await budgetsService.updateUserBudget(
      userId,
      budgetId,
      budget
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to update budget" });
  }
};

const deleteUserBudget = async (req: Request, res: Response) => {
  try {
    const { userId, budgetId } = req.params;

    if (!userId || !budgetId) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    const response = await budgetsService.deleteUserBudget(userId, budgetId);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to delete budget" });
  }
};

export default {
  getUserBudgets,
  addUserBudgets,
  updateUserBudget,
  deleteUserBudget,
};
