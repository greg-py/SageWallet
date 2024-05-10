import { BudgetCategory } from "../models/budget";
import { Transaction } from "../models/transaction";

export const calculateBudgetStats = (
  budget: BudgetCategory[],
  transactions: Transaction[]
) => {
  let totalBudget = 0;
  budget &&
    budget.forEach((category) => {
      totalBudget += parseFloat(parseFloat(category.budget).toFixed(2));
    });

  let totalSpend = 0;
  transactions &&
    transactions.forEach((transaction) => {
      totalSpend += parseFloat(parseFloat(transaction.price).toFixed(2));
    });

  let spendPercentage = 0;
  if (totalBudget && totalSpend) {
    spendPercentage = Math.round((totalSpend / totalBudget) * 100);
  }

  const spendRemaining = totalBudget - totalSpend;

  const isWithinBudget = totalSpend <= totalBudget;

  return {
    totalBudget,
    totalSpend,
    spendPercentage,
    spendRemaining,
    isWithinBudget,
  };
};
