import { Request, Response } from "express";
import incomeService from "../services/incomeService";

const getUserIncome = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { month, year } = req.query;

    if (!userId || !month || !year) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    if (typeof month !== "string" || typeof year !== "string") {
      return res.status(400).send({ error: "Invalid query parameters" });
    }

    const response = await incomeService.getUserIncome(userId, month, year);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch income" });
  }
};

const addUserIncome = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const income = req.body;

    if (!userId || !income) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    const response = await incomeService.addUserIncome(userId, income);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to add income" });
  }
};

const updateUserIncome = async (req: Request, res: Response) => {
  try {
    const { userId, incomeId } = req.params;
    const income = req.body;

    if (!userId || !incomeId || !income) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    if (userId !== income.userId || incomeId !== income.id) {
      return res.status(400).send({ error: "ID mismatch" });
    }

    const response = await incomeService.updateUserIncome(
      userId,
      incomeId,
      income
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to update income" });
  }
};

const deleteUserIncome = async (req: Request, res: Response) => {
  try {
    const { userId, incomeId } = req.params;

    if (!userId || !incomeId) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    const response = await incomeService.deleteUserIncome(userId, incomeId);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to delete income" });
  }
};

export default {
  getUserIncome,
  addUserIncome,
  updateUserIncome,
  deleteUserIncome,
};
