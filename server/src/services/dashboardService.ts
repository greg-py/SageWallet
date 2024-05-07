import { FormattedTransaction } from "../models/transaction";
import budgetsRepository from "../repository/budgetsRepository";
import transactionsRepository from "../repository/transactionsRepository";
import { getUTCDateRange } from "../utils/dates";

const getUserDashboard = async (
  userId: string,
  month: string,
  year: string
) => {
  // Use month and year query parameters to build date range for query
  const { startDate, endDate } = getUTCDateRange(year, month);

  // Fetch transactions from database
  const rawTransactions = await transactionsRepository.findTransactionsByUserId(
    userId,
    startDate,
    endDate
  );

  // Map raw transactions data to formatted transactions class
  let formattedTransactions: FormattedTransaction[] = [];
  if (rawTransactions) {
    rawTransactions.forEach((transaction) => {
      const formattedTransaction = new FormattedTransaction(transaction);
      formattedTransactions.push(formattedTransaction);
    });
  }

  // Calculate total amount spent in current period
  let currentSpend = 0;
  formattedTransactions.forEach((transaction) => {
    const priceString = transaction.price?.toString();
    if (priceString) {
      currentSpend += parseFloat(priceString);
    }
  });
  currentSpend = parseFloat(currentSpend.toFixed(2));

  // Fetch budgets from database
  const rawBudgetCategories = await budgetsRepository.findBudgetsByUserId(
    userId
  );

  // TODO: Map raw budget categories to formatted budget category class

  // Calculate budget total for current period
  let budgetTotal = 0;
  rawBudgetCategories.forEach((category) => {
    const amountString = category.budget?.toString();
    if (amountString) {
      budgetTotal += parseFloat(amountString);
    }
  });
  budgetTotal = parseFloat(budgetTotal.toFixed(2));

  // Calculate percentage spent in current period
  let percentageSpent = 0;
  if (currentSpend && budgetTotal) {
    percentageSpent = parseFloat((currentSpend / budgetTotal).toFixed(2));
  }

  // Limit transactions and budgets returned to first five
  // const countLimit = 5;
  // formattedTransactions.length = countLimit;
  // rawBudgetCategories.length = countLimit;

  return {
    transactions: formattedTransactions,
    currentSpend: currentSpend,
    budgets: rawBudgetCategories,
    budgetTotal: budgetTotal,
    percentageSpent: percentageSpent,
  };
};

export default {
  getUserDashboard,
};
