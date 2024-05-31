import Error from "../../components/Layout/Error";
import Layout from "../../components/Layout/Layout";
import LoadingSpinner from "../../components/Layout/LoadingSpinner";
import PageContainer from "../../components/Layout/PageContainer";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useFilter } from "../../hooks/useFilter";
import { filterBudgetByTransactions } from "../../utils/budget";
import { returnRecentTransactions } from "../../utils/transaction";
import BudgetTable from "./components/BudgetTable";
import DashboardRow from "./components/DashboardRow";
import Balances from "./components/Stats/Balances";
import Budget from "./components/Stats/Budget";
import Incomes from "./components/Stats/Incomes";
import TransactionsList from "./components/TransactionsList";

const Dashboard = () => {
  const { filterMonth, filterYear } = useFilter();

  const {
    isPending,
    error,
    budgetData,
    transactionsData,
    incomeData,
    balancesData,
  } = useDashboardData(filterMonth, filterYear);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (
    error ||
    !budgetData ||
    !transactionsData ||
    !incomeData ||
    !balancesData
  ) {
    return <Error />;
  }

  // Get recent transactions for transactions list and budget table
  const recentTransactions = returnRecentTransactions(transactionsData);

  // Filter budget categories to recent transactions
  const recentBudgetCategories = filterBudgetByTransactions(
    budgetData,
    recentTransactions
  );

  return (
    <Layout>
      <PageContainer>
        <Budget budget={budgetData} transactions={transactionsData} />
        <DashboardRow>
          <TransactionsList transactions={recentTransactions} />
          <BudgetTable
            budgetCategories={recentBudgetCategories}
            transactions={transactionsData}
          />
        </DashboardRow>
        <Balances balances={balancesData} />
        <Incomes
          income={incomeData}
          budget={budgetData}
          transactions={transactionsData}
        />
      </PageContainer>
    </Layout>
  );
};

export default Dashboard;
