import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import LoadingOverlay from "../components/layout/LoadingOverlay";
import { transactionsQuery } from "../api/queries/transactions";

import TransactionSection from "../components/dashboard/transactions/TransactionSection";
import BudgetSection from "../components/dashboard/budget/BudgetSection";
import { budgetQuery } from "../api/queries/budget";

const Dashboard = () => {
  const { user } = useAuth0();
  const userId = user?.sub || "";
  const {
    isPending: isTransactionsPending,
    error: transactionError,
    data: transactions,
  } = useQuery(transactionsQuery(userId));
  const {
    isPending: isBudgetPending,
    error: budgetError,
    data: budget,
  } = useQuery(budgetQuery(userId));

  if (isTransactionsPending || isBudgetPending) {
    return <LoadingOverlay />;
  }

  if (transactionError) {
    return <div>{transactionError.message}</div>;
  } else if (budgetError) {
    return <div>{budgetError.message}</div>;
  }

  return (
    <div className="lg:px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-4">
        <TransactionSection transactions={transactions} />
        <BudgetSection budget={budget} transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
