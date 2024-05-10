import { BudgetCategory } from "../models/budget";
import { Transaction } from "../models/transaction";

export const calculateBudgetCurrents = (
  budgetCategories: BudgetCategory[],
  transactions: Transaction[]
) => {
  const data = budgetCategories.map((category) => {
    let currentTotal = 0;
    const categoryTransactions = transactions.filter((transaction) => {
      return transaction.category === category.category;
    });

    categoryTransactions.forEach(
      (transaction) => (currentTotal += parseFloat(transaction.price))
    );
    category.budget = Math.round(parseFloat(category.budget)).toString();
    category.current = Math.round(currentTotal).toString();
    if (category.budget && parseFloat(category.budget) > 0) {
      category.currentPercentage = Math.round(
        (Math.round(currentTotal) / Math.round(parseFloat(category.budget))) *
          100
      ).toString();
    }

    return category;
  });

  data.sort((a, b) => parseFloat(b.budget) - parseFloat(a.budget));
  return data;
};

export const calculateBudgetTotals = (budgetCategories: BudgetCategory[]) => {
  let budgetTotal = 0;
  let currentTotal = 0;

  budgetCategories.forEach((category) => {
    budgetTotal += parseFloat(category.budget);
    if (category.current) {
      currentTotal += parseFloat(category.current);
    }
  });

  const differenceTotal = currentTotal - budgetTotal;

  return {
    budgetTotal,
    currentTotal,
    differenceTotal,
  };
};

export const buildCategoryList = (budgetCategories: BudgetCategory[]) => {
  const categories: string[] = [];
  budgetCategories.forEach((category) => {
    if (!categories.includes(category.category)) {
      categories.push(category.category);
    }
  });
  categories.sort();
  return categories;
};

export const filterBudgetByTransactions = (
  budget: BudgetCategory[],
  transactions: Transaction[]
) => {
  // Create array of recent transaction categories
  const recentTransactionCategories: string[] = [];
  transactions &&
    transactions.forEach((transaction) => {
      if (!recentTransactionCategories.includes(transaction.category)) {
        recentTransactionCategories.push(transaction.category);
      }
    });

  // Create new array of budget categories from recent transactions
  const recentBudgetCategories: BudgetCategory[] = [];
  budget &&
    budget.forEach((category) => {
      if (recentTransactionCategories.includes(category.category)) {
        recentBudgetCategories.push(category);
      }
    });

  return recentBudgetCategories;
};
