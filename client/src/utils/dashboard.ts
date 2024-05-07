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
