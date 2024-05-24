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
import { useState } from "react";
import EditButton from "./components/EditButton";

interface BudgetProps {
  filterMonth: number;
  filterYear: number;
}

const Budget = ({ filterMonth, filterYear }: BudgetProps) => {
  // Component state
  const [editEnabled, setEditEnabled] = useState(false);

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
        <div className="flex flex-row space-x-2">
          <EditButton
            editEnabled={editEnabled}
            setEditEnabled={setEditEnabled}
          />
          <AddModal />
        </div>
      </div>
      <PageCard>
        <BudgetTable
          budget={budget}
          transactions={transactions}
          editEnabled={editEnabled}
        />
      </PageCard>
    </PageContainer>
  );
};

export default Budget;
