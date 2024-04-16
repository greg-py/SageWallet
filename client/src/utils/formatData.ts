import { Budget } from "../models/Budget";
import { Transaction } from "../models/Transaction";

export const formatTransactionsData = (data: Transaction[]) => {
  const sortedData = data.sort((a: Transaction, b: Transaction) => {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  });

  sortedData.forEach(
    (item) => (item.date = new Date(item.date).toLocaleDateString("en-us"))
  );

  return sortedData;
};

export const calculateBudgetActuals = (
  budget: Budget[],
  transactions: Transaction[]
) => {
  // If invalid transactions or budget data provided, return empty array
  if (!transactions.length || !budget.length) {
    return [];
  }

  // Loop through budget array and calculate sum of transactions by category
  budget &&
    budget.forEach((category) => {
      const categoryTransactions = transactions.filter(
        (item) => item.category === category.category
      );
      let sum = 0;
      categoryTransactions.forEach((transaction) => (sum += transaction.price));
      category.actual = sum;
    });

  return budget;
};
