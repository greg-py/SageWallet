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

export const calculateBudgetTotals = (budgetCategories: BudgetCategory[]) => {
  let budgetTotal = 0;
  let currentTotal = 0;

  budgetCategories.forEach((category) => {
    budgetTotal += parseFloat(category.budget);
    if (category.current) {
      currentTotal += parseFloat(category.current);
    }
  });

  return {
    budgetTotal,
    currentTotal,
  };
};

export const handleTransactionAmountChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAmount: React.Dispatch<React.SetStateAction<string>>
) => {
  const value = e.target.value;
  const regex = /^[0-9]*\.?[0-9]{0,2}$/; // Regex to limit to two decimal places

  if (value === "" || regex.test(value)) {
    setAmount(value);
  }
};

export const handleBudgetAmountChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setBudget: React.Dispatch<React.SetStateAction<string>>
) => {
  const value = e.target.value;
  const regex = /^[0-9]*\.?[0-9]{0,2}$/; // Regex to limit to two decimal places

  if (value === "" || regex.test(value)) {
    setBudget(value);
  }
};
