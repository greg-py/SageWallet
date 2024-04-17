import Transaction from "../models/transaction";

const findTransactionsByUserId = async (userId: string) => {
  try {
    const transactions = await Transaction.findAll({
      where: { user_id: userId },
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

export default { findTransactionsByUserId, addTransactionByUserId };
