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

    return category;
  });

  data.sort((a, b) => parseFloat(b.budget) - parseFloat(a.budget));
  return data;
};
