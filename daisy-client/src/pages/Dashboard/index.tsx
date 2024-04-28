import StatsGrid from "./components/StatsGrid";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Layout/LoadingSpinner";
import { budgetQuery } from "../../api/queries";
import { transactionsQuery } from "../../api/queries/defs/transaction";
import TransactionsList from "./components/TransactionsList";
import BudgetTable from "./components/BudgetTable";
import { useState } from "react";

const Dashboard = () => {
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const { user } = useAuth0();
  const userId = user?.sub || "";
  const {
    isPending: isTransactionsPending,
    error: isTransactionsError,
    data: transactions,
  } = useQuery(transactionsQuery(userId));
  const {
    isPending: isBudgetPending,
    error: isBudgetError,
    data: budget,
  } = useQuery(budgetQuery(userId));

  if (isTransactionsPending || isBudgetPending) {
    return <LoadingSpinner />;
  }

  if (isTransactionsError || isBudgetError) {
    return <p>There was an error loading data</p>;
  }

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <StatsGrid />
      <div className="mt-4 grid grid-cols-12 h-96 gap-4 md:mt-6 md:gap-6 2xl:mt-8 2xl:gap-8">
        <TransactionsList
          data={transactions}
          filterCategories={filterCategories}
          setFilterCategories={setFilterCategories}
        />
        <BudgetTable data={budget} />
      </div>
    </div>
  );
};

export default Dashboard;
