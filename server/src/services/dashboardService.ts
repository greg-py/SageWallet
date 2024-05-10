import { FormattedTransaction } from "../models/transaction";
import budgetsRepository from "../repository/budgetsRepository";
import incomeRepository from "../repository/incomeRepository";
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

  // Calculate percentage spent and spend remaining in current period
  let percentageSpent = 0;
  let spendRemaining = 0;
  if (currentSpend && budgetTotal) {
    percentageSpent = parseFloat((currentSpend / budgetTotal).toFixed(2));
    spendRemaining = parseFloat((budgetTotal - currentSpend).toFixed(2));
  }

  // Fetch income from database
  const rawIncome = await incomeRepository.findIncomeByUserId(
    userId,
    startDate,
    endDate
  );

  // TODO: Map raw income to formatted income class

  // Calculate income total for current period
  let incomeTotal = 0;
  rawIncome.forEach((income) => {
    const amountString = income.amount?.toString();
    if (amountString) {
      incomeTotal += parseFloat(amountString);
    }
  });
  incomeTotal = parseFloat(incomeTotal.toFixed(2));

  // Calculate income vs. budget and spent
  let incomeToBudgetDiff = 0;
  let incomeToSpendDiff = 0;
  if (incomeTotal && budgetTotal && currentSpend) {
    incomeToBudgetDiff = parseFloat((incomeTotal - budgetTotal).toFixed(2));
    incomeToSpendDiff = parseFloat((incomeTotal - currentSpend).toFixed(2));
  }

  // Filter transactions to most recent five
  const recentTransactions = formattedTransactions.slice(0, 5);

  // Filter budget categories to categories of recent transactions
  const recentTransactionsCategories = recentTransactions.map(
    (transaction) => transaction.category
  );
  const recentBudgetCategories = rawBudgetCategories.filter((budget) =>
    recentTransactionsCategories.includes(budget.category)
  );

  return {
    transactions: recentTransactions,
    currentSpend: currentSpend,
    budgets: recentBudgetCategories,
    budgetTotal: budgetTotal,
    percentageSpent: percentageSpent,
    spendRemaining: spendRemaining,
    incomeTotal: incomeTotal,
    incomeToBudgetDiff: incomeToBudgetDiff,
    incomeToSpendDiff: incomeToSpendDiff,
  };
};

const getUserFilters = async (userId: string) => {
  // Fetch months and years of transactions
  const filters = await transactionsRepository.findMonthsAndYearsByUserId(
    userId
  );

  // Create filters object with transaction months grouped by year
  const filtersObject: any = {};
  if (filters && filters.length) {
    filters.forEach((filter: any) => {
      if (filtersObject[filter.year]) {
        filtersObject[filter.year].push(filter.month);
      } else {
        filtersObject[filter.year] = [filter.month];
      }
    });
  }

  return filtersObject;
};

export default {
  getUserDashboard,
  getUserFilters,
};
