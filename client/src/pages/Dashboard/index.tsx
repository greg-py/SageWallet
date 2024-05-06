// import StatsGrid from "./components/StatsGrid";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Layout/LoadingSpinner";
import { budgetQuery } from "../../api/queries";
import { transactionsQuery } from "../../api/queries/defs/transaction";
import TransactionsList from "./components/TransactionsList";
import BudgetTable from "./components/BudgetTable";
import Filters from "./components/Filters";
import { useState } from "react";

const Dashboard = () => {
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const [filterMonth, setFilterMonth] = useState(currentMonthIndex);
  const [filterYear, setFilterYear] = useState(currentYear);
  const { user } = useAuth0();
  const userId = user?.sub || "";
  const {
    isPending: isTransactionsPending,
    error: isTransactionsError,
    data: transactions,
    refetch: refetchTransactions,
    isRefetching: isRefetchingTransactions,
    isRefetchError: isRefetchTransactionsError,
  } = useQuery(transactionsQuery(userId, filterMonth, filterYear));
  const {
    isPending: isBudgetPending,
    error: isBudgetError,
    data: budget,
  } = useQuery(budgetQuery(userId, filterMonth, filterYear));

  if (isTransactionsPending || isBudgetPending) {
    return <LoadingSpinner />;
  }

  if (isTransactionsError || isBudgetError || isRefetchTransactionsError) {
    return (
      <div className="mx-auto max-w-screen-2xl text-center">
        <p>There was an error loading data</p>;
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      {/* <StatsGrid /> */}
      <Filters
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        transactions={transactions}
        filterCategories={filterCategories}
        setFilterCategories={setFilterCategories}
        refetch={refetchTransactions}
      />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-8 2xl:gap-8">
        <TransactionsList
          transactions={transactions}
          filterCategories={filterCategories}
          refetchPending={isRefetchingTransactions}
        />
        <BudgetTable
          budgetCategories={budget}
          transactions={transactions}
          filterCategories={filterCategories}
          refetchPending={isRefetchingTransactions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
