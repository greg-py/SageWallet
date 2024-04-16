import transactionsRepository from "../repository/transactionsRepository";

const getUserTransactions = async (userId: string) => {
  return await transactionsRepository.findTransactionsByUserId(userId);
};

const addUserTransaction = async (userId: string, transaction: any) => {
  return await transactionsRepository.addTransactionByUserId(
    userId,
    transaction
  );
};

export default { getUserTransactions, addUserTransaction };
