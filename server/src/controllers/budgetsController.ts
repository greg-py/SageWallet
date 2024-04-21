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

export default {
  getUserBudgets,
  addUserBudgets,
};
