import { Request, Response } from "express";
import transactionsService from "../services/transactionsService";

const getUserTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const response = await transactionsService.getUserTransactions(userId);
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

export default { getUserTransactions, addUserTransaction };
