import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import DashboardRow from "./components/DashboardRow";
import LoadingSpinner from "../../components/Layout/LoadingSpinner";
import TransactionsList from "./components/TransactionsList";
import BudgetTable from "./components/BudgetTable";
import { dashboardQuery } from "../../api/queries";
import PageTitle from "../../components/Layout/PageTitle";
import Balances from "./components/Stats/Balances";
import Budget from "./components/Stats/Budget";
import Income from "./components/Stats/Income";
import PageContainer from "../../components/Layout/PageContainer";

interface DashboardProps {
  filterMonth: number;
  filterYear: number;
}

const Dashboard = ({ filterMonth, filterYear }: DashboardProps) => {
  // User authentication
  const { user } = useAuth0();
  const userId = user?.sub || "";

  // Queries
  const { isPending, error, data, isRefetching, isRefetchError } = useQuery(
    dashboardQuery(userId, filterMonth, filterYear)
  );

  // Format stats values
  const percentageSpent = data?.percentageSpent
    ? `${Math.round(data.percentageSpent * 100)}%`
    : null;
  const isWithinBudget =
    data?.currentSpend && data?.budgetTotal
      ? data.currentSpend <= data.budgetTotal
      : false;

  // Show loading spinner if queries are pending
  if (isPending) {
    return <LoadingSpinner />;
  }

  // Show error message if query has error
  if (error || isRefetchError) {
    return (
      <div className="mx-auto max-w-screen-2xl text-center">
        <p>There was an error loading data</p>;
      </div>
    );
  }

  return (
    <PageContainer>
      <PageTitle>Dashboard</PageTitle>
      <Balances />
      <Budget
        budget={data.budgetTotal}
        spend={data.currentSpend}
        spendPercentage={percentageSpent}
        remaining={data.spendRemaining}
        isWithinBudget={isWithinBudget}
      />
      <DashboardRow>
        <TransactionsList
          transactions={data.transactions}
          refetchPending={isRefetching}
          budgetCategories={data.budgets}
          filterMonth={filterMonth}
          filterYear={filterYear}
        />
        <BudgetTable
          budgetCategories={data.budgets}
          transactions={data.transactions}
          refetchPending={isRefetching}
        />
      </DashboardRow>
      <Income />
    </PageContainer>
  );
};

export default Dashboard;
