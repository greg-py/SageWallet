import Balance from "../models/balance";

const findBalancesByUserId = async (userId: string) => {
  try {
    const balances = await Balance.findAll({
      where: { user_id: userId },
      order: [
        ["amount", "DESC"],
        ["updated_at", "DESC"],
      ],
    });
    return balances;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        "Database error when fetching balances: " + error.message
      );
    }
    return [];
  }
};

const addBalanceByUserId = async (userId: string, balance: any) => {
  try {
    return await Balance.create({
      user: balance.user,
      account: balance.account,
      amount: balance.amount,
      type: balance.type,
      user_id: userId,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        "Database error when inserting balance: " + error.message
      );
    }
  }
};

const updateBalanceByUserId = async (
  userId: string,
  balanceId: string,
  balance: any
) => {
  try {
    return await Balance.update(
      {
        user: balance.user,
        account: balance.account,
        amount: balance.amount,
        type: balance.type,
        user_id: balance.userId,
      },
      {
        where: { id: balanceId, user_id: userId },
        returning: true,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when updating balance: " + error.message);
    }
  }
};

const deleteBalanceByBalanceId = async (userId: string, balanceId: string) => {
  try {
    return await Balance.destroy({
      where: {
        id: balanceId,
        user_id: userId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when deleting balance: " + error.message);
    }
  }
};

export default {
  findBalancesByUserId,
  addBalanceByUserId,
  updateBalanceByUserId,
  deleteBalanceByBalanceId,
};
