import PageContainer from "../../components/Layout/PageContainer";
import PageTitle from "../../components/Layout/PageTitle";
import BudgetTable from "./components/BudgetTable";
import PageCard from "../../components/Layout/PageCard";
import Spinner from "../../components/Layout/Spinner";
import AddModal from "./components/AddModal";
import Error from "../../components/Layout/Error";
import { useState } from "react";
import EditButton from "./components/EditButton";
import { useBudgetData } from "../../hooks/useBudgetData";
import Layout from "../../components/Layout/Layout";
import { useFilter } from "../../hooks/useFilter";

const Budget = () => {
  // Component state
  const [editEnabled, setEditEnabled] = useState(false);

  const { filterMonth, filterYear } = useFilter();

  // Queries
  const { isPending, error, budgetData, transactionsData } = useBudgetData(
    filterMonth,
    filterYear
  );

  // Show loading spinner if queries are pending
  if (isPending) {
    return <Spinner />;
  }

  // Show error message if queries have error
  if (error || !budgetData || !transactionsData) {
    return <Error />;
  }

  return (
    <Layout>
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
            budget={budgetData}
            transactions={transactionsData}
            editEnabled={editEnabled}
          />
        </PageCard>
      </PageContainer>
    </Layout>
  );
};

export default Budget;
