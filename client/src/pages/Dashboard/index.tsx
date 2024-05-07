import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import DashboardContainer from "./components/DashboardContainer";
import DashboardRow from "./components/DashboardRow";
import LoadingSpinner from "../../components/Layout/LoadingSpinner";
import TransactionsList from "./components/TransactionsList";
import BudgetTable from "./components/BudgetTable";
import Filters from "./components/Filters";
import { useState } from "react";
import { dashboardQuery } from "../../api/queries";
import StatsCard from "./components/Stats";
import PageTitle from "../../components/Layout/PageTitle";

const Dashboard = () => {
  // Page state
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [filterMonth, setFilterMonth] = useState(currentMonthIndex);
  const [filterYear, setFilterYear] = useState(currentYear);

  // User authentication
  const { user } = useAuth0();
  const userId = user?.sub || "";

  // Queries
  const { isPending, error, data, refetch, isRefetching, isRefetchError } =
    useQuery(dashboardQuery(userId, filterMonth, filterYear));

  // Format stats values
  const budgetTotal = data?.budgetTotal
    ? `$${Math.round(data.budgetTotal)}`
    : null;
  const currentSpend = data?.currentSpend
    ? `$${Math.round(data.currentSpend)}`
    : null;
  const percentageSpent = data?.percentageSpent
    ? `${Math.round(data.percentageSpent * 100)}%`
    : null;
  const isWithinBudget =
    data?.currentSpend && data?.budgetTotal
      ? data.currentSpend <= data.budgetTotal
      : false;
  const spendRemaining =
    data?.budgetTotal && data?.currentSpend
      ? `$${Math.round(data.budgetTotal - data.currentSpend)}`
      : null;

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
    <DashboardContainer>
      <PageTitle>Dashboard</PageTitle>
      <Filters
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        refetch={refetch}
      />
      <DashboardRow>
        <StatsCard title="Budget ($)" value={budgetTotal} />
        <StatsCard
          title="Spend ($)"
          value={currentSpend}
          success={isWithinBudget}
        />
        <StatsCard
          title="Spend (%)"
          value={percentageSpent}
          success={isWithinBudget}
        />
        <StatsCard
          title="Remaining ($)"
          value={spendRemaining}
          success={isWithinBudget}
        />
      </DashboardRow>
      <DashboardRow>
        <TransactionsList
          transactions={data.transactions}
          refetchPending={isRefetching}
          budgetCategories={data.budgets}
        />
        <BudgetTable
          budgetCategories={data.budgets}
          transactions={data.transactions}
          refetchPending={isRefetching}
        />
      </DashboardRow>
    </DashboardContainer>
  );
};

export default Dashboard;
