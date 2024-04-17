import transactionsRepository from "../repository/transactionsRepository";
import { FormattedTransaction } from "../models/transaction";

const getUserTransactions = async (userId: string) => {
  // Fetch transactions from database
  const rawTransactions = await transactionsRepository.findTransactionsByUserId(
    userId
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

export default { getUserTransactions, addUserTransaction };
