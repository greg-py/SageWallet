import transactionsRepository from "../repository/transactionsRepository";
import {
  DatabaseTransaction,
  FormattedTransaction,
} from "../models/transaction";
import { getUTCDateRange } from "../utils/dates";

const getUserTransactions = async (
  userId: string,
  month: string,
  year: string
) => {
  // Use month and year query parameters to build date range for query
  const { startDate, endDate } = getUTCDateRange(year, month);

  // Fetch transactions from database
  const rawTransactions = await transactionsRepository.findTransactionsByUserId(
    userId,
    startDate,
    endDate
  );

  // Map raw transactions data to formatted transactions class
  let formattedTransactions: FormattedTransaction[] = [];
  if (rawTransactions) {
    rawTransactions.forEach((transaction) => {
      const formattedTransaction = new FormattedTransaction(transaction);
      formattedTransactions.push(formattedTransaction);
    });
  }

  return formattedTransactions;
};

const addUserTransaction = async (userId: string, transaction: any) => {
  return await transactionsRepository.addTransactionByUserId(
    userId,
    transaction
  );
};

const updateUserTranasction = async (
  userId: string,
  transactionId: string,
  transaction: any
) => {
  // Map transaction data from request to database transaction model
  const formattedTransaction = new DatabaseTransaction(transaction);

  return await transactionsRepository.updateTransactionByTransactionId(
    userId,
    transactionId,
    formattedTransaction
  );
};

const deleteUserTransaction = async (userId: string, transactionId: string) => {
  return await transactionsRepository.deleteTransactionByTransactionId(
    userId,
    transactionId
  );
};

export default {
  getUserTransactions,
  addUserTransaction,
  updateUserTranasction,
  deleteUserTransaction,
};
