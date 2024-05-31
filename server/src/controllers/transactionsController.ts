import { Request, Response } from "express";
import transactionsService from "../services/transactionsService";

const getUserTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { month, year } = req.query;

    if (!userId || !month || !year) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    if (typeof month !== "string" || typeof year !== "string") {
      return res.status(400).send({ error: "Invalid query parameters" });
    }

    const response = await transactionsService.getUserTransactions(
      userId,
      month,
      year
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch transactions" });
  }
};

const addUserTransaction = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const transaction = req.body;

    const response = await transactionsService.addUserTransaction(
      userId,
      transaction
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to add transaction" });
  }
};

const updateUserTransaction = async (req: Request, res: Response) => {
  try {
    const { userId, transactionId } = req.params;
    const transaction = req.body;

    if (!userId || !transactionId || !transaction) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    if (userId !== transaction.userId || transactionId !== transaction.id) {
      return res.status(400).send({ error: "ID mismatch" });
    }

    const response = await transactionsService.updateUserTranasction(
      userId,
      transactionId,
      transaction
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to update transaction" });
  }
};

const deleteUserTransaction = async (req: Request, res: Response) => {
  try {
    const { userId, transactionId } = req.params;

    if (!userId || !transactionId) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    const response = await transactionsService.deleteUserTransaction(
      userId,
      transactionId
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to delete transaction" });
  }
};

export default {
  getUserTransactions,
  addUserTransaction,
  updateUserTransaction,
  deleteUserTransaction,
};
