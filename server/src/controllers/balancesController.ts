import { Request, Response } from "express";
import balancesService from "../services/balancesService";

const getUserBalances = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const response = await balancesService.getUserBalances(userId);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch balances" });
  }
};

const addUserBalance = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const balance = req.body;
    const response = await balancesService.addUserBalance(userId, balance);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to add balance" });
  }
};

const updateUserBalance = async (req: Request, res: Response) => {
  try {
    const { userId, balanceId } = req.params;
    const balance = req.body;

    if (!userId || !balanceId || !balance) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    if (userId !== balance.userId || balanceId !== balance.id) {
      return res.status(400).send({ error: "ID mismatch" });
    }

    const response = await balancesService.updateUserBalance(
      userId,
      balanceId,
      balance
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to update balance" });
  }
};

const deleteUserBalance = async (req: Request, res: Response) => {
  try {
    const { userId, balanceId } = req.params;

    if (!userId || !balanceId) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    const response = await balancesService.deleteUserBalance(userId, balanceId);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to delete balance" });
  }
};

export default {
  getUserBalances,
  addUserBalance,
  updateUserBalance,
  deleteUserBalance,
};
