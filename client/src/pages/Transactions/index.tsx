import { useAuth0 } from "@auth0/auth0-react";
import PageContainer from "../../components/Layout/PageContainer";
import PageTitle from "../../components/Layout/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { budgetQuery, transactionsQuery } from "../../api/queries";
import Spinner from "../../components/Layout/Spinner";
import PageCard from "../../components/Layout/PageCard";
import AddModal from "./components/AddModal";
import TransactionsTable from "./components/TransactionTable";
import Error from "../../components/Layout/Error";

interface TransactionsProps {
  filterMonth: number;
  filterYear: number;
}

const Transactions = ({ filterMonth, filterYear }: TransactionsProps) => {
  // User authentication
  const { user } = useAuth0();
  const userId = user?.sub || "";

  // Get min and max dates for datepicker based on current filter selection
  const minDate = new Date(filterYear, filterMonth, 1)
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(filterYear, filterMonth + 1, 0)
    .toISOString()
    .split("T")[0];

  // Queries
  const {
    isPending: isTransactionsPending,
    error: transactionsError,
    data: transactions,
    isRefetching: isTransactionsRefetching,
    isRefetchError: transactionsRefetchError,
  } = useQuery(transactionsQuery(userId, filterMonth, filterYear));
  const {
    isPending: isBudgetPending,
    error: budgetError,
    data: budget,
    isRefetching: isBudgetRefetching,
    isRefetchError: budgetRefetchError,
  } = useQuery(budgetQuery(userId));

  // Show loading spinner if queries are pending
  if (
    isTransactionsPending ||
    isTransactionsRefetching ||
    isBudgetPending ||
    isBudgetRefetching
  ) {
    return <Spinner />;
  }

  // Show error message if query has error
  if (
    transactionsError ||
    transactionsRefetchError ||
    budgetError ||
    budgetRefetchError
  ) {
    return <Error />;
  }

  return (
    <PageContainer>
      <div className="flex flex-row justify-between">
        <PageTitle>Transactions</PageTitle>
        <AddModal
          minDate={minDate}
          maxDate={maxDate}
          budgetCategories={budget}
          filterMonth={filterMonth}
          filterYear={filterYear}
        />
      </div>
      <PageCard>
        <TransactionsTable
          transactions={transactions}
          budget={budget}
          filterMonth={filterMonth}
          filterYear={filterYear}
        />
      </PageCard>
    </PageContainer>
  );
};

export default Transactions;
