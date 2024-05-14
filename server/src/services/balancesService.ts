import { FormattedBalance } from "../models/balance";
import balancesRepository from "../repository/balancesRepository";

const getUserBalances = async (userId: string) => {
  // Fetch raw balances
  const rawBalances = await balancesRepository.findBalancesByUserId(userId);

  // Map raw balances to formatted balances class
  let formattedBalances: FormattedBalance[] = [];
  if (rawBalances) {
    rawBalances.forEach((balance) => {
      const formattedBalance = new FormattedBalance(balance);
      formattedBalances.push(formattedBalance);
    });
  }

  return formattedBalances;
};

const addUserBalance = async (userId: string, balance: any) => {
  return await balancesRepository.addBalanceByUserId(userId, balance);
};

const updateUserBalance = async (
  userId: string,
  balanceId: string,
  balance: any
) => {
  return await balancesRepository.updateBalanceByUserId(
    userId,
    balanceId,
    balance
  );
};

const deleteUserBalance = async (userId: string, balanceId: string) => {
  return await balancesRepository.deleteBalanceByBalanceId(userId, balanceId);
};

export default {
  getUserBalances,
  addUserBalance,
  updateUserBalance,
  deleteUserBalance,
};
