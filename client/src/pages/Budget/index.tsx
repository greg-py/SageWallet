import { useAuth0 } from "@auth0/auth0-react";
import PageContainer from "../../components/Layout/PageContainer";
import PageTitle from "../../components/Layout/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { budgetQuery, transactionsQuery } from "../../api/queries";
import LoadingSpinner from "../../components/Layout/LoadingSpinner";
import BudgetTable from "./components/BudgetTable";

interface BudgetProps {
  filterMonth: number;
  filterYear: number;
}

const Budget = ({ filterMonth, filterYear }: BudgetProps) => {
  // User authentication
  const { user } = useAuth0();
  const userId = user?.sub || "";

  // Queries
  const {
    isPending: isBudgetPending,
    error: isBudgetError,
    data: budget,
  } = useQuery(budgetQuery(userId));
  const {
    isPending: isTransactionsPending,
    error: isTransactionsError,
    data: transactions,
  } = useQuery(transactionsQuery(userId, filterMonth, filterYear));

  // Show loading spinner if queries are pending
  if (isBudgetPending || isTransactionsPending) {
    return <LoadingSpinner />;
  }

  // Show error message if query has error
  if (isBudgetError || isTransactionsError) {
    return (
      <div className="mx-auto max-w-screen-2xl text-center">
        <p>There was an error loading data</p>
      </div>
    );
  }

  return (
    <PageContainer>
      <PageTitle>Budget</PageTitle>
      <BudgetTable budget={budget} transactions={transactions} />
    </PageContainer>
  );
};

export default Budget;
