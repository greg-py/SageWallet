import { useAuth0 } from "@auth0/auth0-react";
import { budgetQuery, transactionsQuery } from "../../api/queries";
import { useQuery } from "@tanstack/react-query";
import { incomeQuery } from "../../api/queries/defs/income";
import LoadingSpinner from "../../components/Layout/LoadingSpinner";
import PageContainer from "../../components/Layout/PageContainer";
import PageTitle from "../../components/Layout/PageTitle";
import Balances from "./components/Stats/Balances";
import Budget from "./components/Stats/Budget";
import DashboardRow from "./components/DashboardRow";
import TransactionsList from "./components/TransactionsList";
import BudgetTable from "./components/BudgetTable";
import Incomes from "./components/Stats/Incomes";
import { returnRecentTransactions } from "../../utils/transaction";
import { filterBudgetByTransactions } from "../../utils/budget";

interface DashboardProps {
  filterMonth: number;
  filterYear: number;
}

const Dashboard = ({ filterMonth, filterYear }: DashboardProps) => {
  // User authentication
  const { user } = useAuth0();
  const userId = user?.sub || "";

  // Queries
  const {
    isPending: isBudgetPending,
    error: budgetError,
    data: budget,
  } = useQuery(budgetQuery(userId));
  const {
    isPending: isTransactionsPending,
    error: transactionsError,
    data: transactions,
  } = useQuery(transactionsQuery(userId, filterMonth, filterYear));
  const {
    isPending: isIncomePending,
    error: incomeError,
    data: income,
  } = useQuery(incomeQuery(userId, filterMonth, filterYear));

  // Show loading spinner if queries are pending
  if (isBudgetPending || isTransactionsPending || isIncomePending) {
    return <LoadingSpinner />;
  }

  // Show error message if query has error
  if (budgetError || transactionsError || incomeError) {
    return (
      <div className="mx-auto max-w-screen-2xl text-center">
        <p>There was an error loading data</p>
      </div>
    );
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
      <PageTitle>Dashboard</PageTitle>
      <Budget budget={budget} transactions={transactions} />
      <DashboardRow>
        <TransactionsList transactions={recentTransactions} />
        <BudgetTable
          budgetCategories={recentBudgetCategories}
          transactions={transactions}
        />
      </DashboardRow>
      <Balances />
      <Incomes income={income} budget={budget} transactions={transactions} />
    </PageContainer>
  );
};

export default Dashboard;
