import { BALANCE_TYPES } from "../config/constants";
import { BalancesCategory } from "../models/balances";

export const calculateBalanceStats = (balances: BalancesCategory[]) => {
  let totalCash = 0;
  let totalInvestments = 0;
  let totalDebt = 0;
  let netWorth = 0;

  balances.forEach((balance) => {
    // Cash
    if (balance.type === BALANCE_TYPES[0]) {
      totalCash += parseFloat(balance.amount);
    }

    // Investments
    if (balance.type === BALANCE_TYPES[1]) {
      totalInvestments += parseFloat(balance.amount);
    }

    // Debt
    if (balance.type === BALANCE_TYPES[2]) {
      totalDebt += parseFloat(balance.amount);
    }
  });

  netWorth = totalCash + totalInvestments - totalDebt;

  return {
    totalCash,
    totalInvestments,
    totalDebt,
    netWorth,
  };
};
