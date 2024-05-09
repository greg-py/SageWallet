import { Op, QueryTypes } from "sequelize";
import Transaction, { DatabaseTransaction } from "../models/transaction";

const findTransactionsByUserId = async (
  userId: string,
  startDate: string,
  endDate: string
) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
      order: [
        ["date", "DESC"],
        ["created_at", "DESC"],
      ],
    });
    return transactions;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(
        "Database error when fetching transactions: " + error.message
      );
    return [];
  }
};

const findMonthsAndYearsByUserId = async (userId: string) => {
  const query = `
    SELECT DISTINCT EXTRACT(YEAR FROM date) AS year, EXTRACT(MONTH FROM date) AS month
    FROM transactions
    WHERE user_id = :userId
    ORDER BY year DESC, month DESC;
  `;

  try {
    const filters = await Transaction.sequelize?.query(query, {
      replacements: { userId },
      type: QueryTypes.SELECT,
    });
    return filters;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        "Database error when fetching months and years: " + error.message
      );
    }
    return [];
  }
};

const addTransactionByUserId = async (userId: string, transaction: any) => {
  try {
    return await Transaction.create({
      date: transaction.date,
      vendor: transaction.vendor,
      price: transaction.price,
      category: transaction.category,
      user_id: userId,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        "Database error when inserting transaction: " + error.message
      );
    }
  }
};

const updateTransactionByTransactionId = async (
  userId: string,
  transactionId: string,
  transaction: DatabaseTransaction
) => {
  try {
    return await Transaction.update(
      {
        date: new Date(transaction.date),
        vendor: transaction.vendor,
        price: transaction.price,
        category: transaction.category,
      },
      {
        where: { id: transactionId, user_id: userId },
        returning: true,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        "Database error when updating transaction: " + error.message
      );
    }
  }
};

const deleteTransactionByTransactionId = async (
  userId: string,
  transactionId: string
) => {
  try {
    return await Transaction.destroy({
      where: {
        id: transactionId,
        user_id: userId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        "Database error when deleting transaction: " + error.message
      );
    }
  }
};

export default {
  findTransactionsByUserId,
  findMonthsAndYearsByUserId,
  addTransactionByUserId,
  updateTransactionByTransactionId,
  deleteTransactionByTransactionId,
};
