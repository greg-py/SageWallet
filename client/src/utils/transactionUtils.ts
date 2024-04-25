import { FILTER_CATEGORIES_ALL_STRING } from "../config/constants";
import { BudgetCategory } from "../models/BudgetCategory";
import { Transaction } from "../models/Transaction";

export const calculateBudgetCurrents = (
  budget: BudgetCategory[],
  transactions: Transaction[]
) => {
  if (!budget || !transactions) {
    return budget;
  }

  budget.forEach((item) => {
    let categoryTotal = 0;
    const categoryTransactions = transactions.filter(
      (transaction) =>
        transaction.category?.trim()?.toLowerCase() ===
        item.category?.trim()?.toLowerCase()
    );
    categoryTransactions.forEach(
      (transaction) => (categoryTotal += parseFloat(transaction.price))
    );
    item.current = categoryTotal.toString();
  });

  return budget;
};

export const createFilterCategories = (transactions: Transaction[]) => {
  const filterOptions: string[] = [];

  transactions &&
    transactions.forEach((transaction) => {
      if (!filterOptions.includes(transaction.category)) {
        filterOptions.push(transaction.category);
      }
    });

  filterOptions.push(FILTER_CATEGORIES_ALL_STRING);

  filterOptions.sort();

  return filterOptions;
};
