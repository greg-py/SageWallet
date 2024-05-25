import { useAuth0 } from "@auth0/auth0-react";
import {
  balancesQuery,
  budgetQuery,
  transactionsQuery,
} from "../../api/queries";
import { useQuery } from "@tanstack/react-query";
import { incomeQuery } from "../../api/queries/defs/income";
import LoadingSpinner from "../../components/Layout/LoadingSpinner";
import PageContainer from "../../components/Layout/PageContainer";
import Balances from "./components/Stats/Balances";
import Budget from "./components/Stats/Budget";
import DashboardRow from "./components/DashboardRow";
import TransactionsList from "./components/TransactionsList";
import BudgetTable from "./components/BudgetTable";
import Incomes from "./components/Stats/Incomes";
import { returnRecentTransactions } from "../../utils/transaction";
import { filterBudgetByTransactions } from "../../utils/budget";
import Error from "../../components/Layout/Error";

interface DashboardProps {
  filterMonth: number;
  filterYear: number;
}

const Dashboard = ({ filterMonth, filterYear }: DashboardProps) => {
  // User authentication
  const { user, getAccessTokenSilently } = useAuth0();
  const userId = user?.sub || "";

  // Queries
  const {
    isPending: isBudgetPending,
    error: budgetError,
    data: budget,
  } = useQuery(budgetQuery(userId, getAccessTokenSilently));
  const {
    isPending: isTransactionsPending,
    error: transactionsError,
    data: transactions,
  } = useQuery(
    transactionsQuery(userId, filterMonth, filterYear, getAccessTokenSilently)
  );
  const {
    isPending: isIncomePending,
    error: incomeError,
    data: income,
  } = useQuery(
    incomeQuery(userId, filterMonth, filterYear, getAccessTokenSilently)
  );
  const {
    isPending: isBalancesPending,
    error: balancesError,
    data: balances,
  } = useQuery(balancesQuery(userId, getAccessTokenSilently));

  // Show loading spinner if queries are pending
  if (
    isBudgetPending ||
    isTransactionsPending ||
    isIncomePending ||
    isBalancesPending
  ) {
    return <LoadingSpinner />;
  }

  // Show error message if query has error
  if (budgetError || transactionsError || incomeError || balancesError) {
    return <Error />;
  }

  // Get recent transactions for transactions list and budget table
  const recentTransactions = returnRecentTransactions(transactions);

  // Filter budget categories to recent transactions
  const recentBudgetCategories = filterBudgetByTransactions(
    budget,
    recentTransactions
  );

  return (
    <PageContainer>
      <Budget budget={budget} transactions={transactions} />
      <DashboardRow>
        <TransactionsList transactions={recentTransactions} />
        <BudgetTable
          budgetCategories={recentBudgetCategories}
          transactions={transactions}
        />
      </DashboardRow>
      <Balances balances={balances} />
      <Incomes income={income} budget={budget} transactions={transactions} />
    </PageContainer>
  );
};

export default Dashboard;
