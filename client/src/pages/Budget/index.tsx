import { useAuth0 } from "@auth0/auth0-react";
import PageContainer from "../../components/Layout/PageContainer";
import PageTitle from "../../components/Layout/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { budgetQuery, transactionsQuery } from "../../api/queries";
import BudgetTable from "./components/BudgetTable";
import PageCard from "../../components/Layout/PageCard";
import Spinner from "../../components/Layout/Spinner";
import AddModal from "./components/AddModal";
import Error from "../../components/Layout/Error";

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
    error: budgetError,
    data: budget,
  } = useQuery(budgetQuery(userId));
  const {
    isPending: isTransactionsPending,
    error: transactionsError,
    data: transactions,
  } = useQuery(transactionsQuery(userId, filterMonth, filterYear));

  // Show loading spinner if queries are pending
  if (isBudgetPending || isTransactionsPending) {
    return <Spinner />;
  }

  // Show error message if queries have error
  if (budgetError || transactionsError) {
    return <Error />;
  }

  return (
    <PageContainer>
      <div className="flex flex-row justify-between">
        <PageTitle>Budget</PageTitle>
        <AddModal />
      </div>
      <PageCard>
        <BudgetTable budget={budget} transactions={transactions} />
      </PageCard>
    </PageContainer>
  );
};

export default Budget;
