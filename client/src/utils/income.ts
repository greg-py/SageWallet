import { BudgetCategory } from "../models/budget";
import { Income } from "../models/income";
import { Transaction } from "../models/transaction";

export const calculateIncomeTotals = (income: Income[]) => {
  let incomeTotal = 0;

  income.forEach((data) => {
    incomeTotal += parseFloat(data.amount);
  });

  return incomeTotal;
};

export const calculateIncomeStats = (
  income: Income[],
  budget: BudgetCategory[],
  transactions: Transaction[]
) => {
  let totalIncome = 0;
  income &&
    income.forEach((data) => {
      totalIncome += parseFloat(parseFloat(data.amount).toFixed(2));
    });

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

  const incomeToBudget = totalIncome - totalBudget;
  const incomeToSpend = totalIncome - totalSpend;

  return {
    totalIncome,
    incomeToBudget,
    incomeToSpend,
  };
};
