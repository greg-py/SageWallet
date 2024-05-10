import { Op } from "sequelize";
import Income from "../models/income";

const findIncomeByUserId = async (
  userId: string,
  startDate: string,
  endDate: string
) => {
  try {
    const income = await Income.findAll({
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
    return income;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when fetching income: " + error.message);
    }
    return [];
  }
};

const addIncomeByUserId = async (userId: string, income: any) => {
  try {
    return await Income.create({
      date: income.date,
      user: income.user,
      source: income.source,
      amount: income.amount,
      user_id: userId,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when inserting income: " + error.message);
    }
  }
};

const updateIncomeByIncomeId = async (
  userId: string,
  incomeId: string,
  income: any
) => {
  try {
    return await Income.update(
      {
        date: new Date(income.date),
        user: income.user,
        source: income.source,
        amount: income.amount,
      },
      {
        where: { id: incomeId, user_id: userId },
        returning: true,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when updating income: " + error.message);
    }
  }
};

const deleteIncomeByIncomeId = async (userId: string, incomeId: string) => {
  try {
    return await Income.destroy({
      where: {
        id: incomeId,
        user_id: userId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when deleting income: " + error.message);
    }
  }
};

export default {
  findIncomeByUserId,
  addIncomeByUserId,
  updateIncomeByIncomeId,
  deleteIncomeByIncomeId,
};
