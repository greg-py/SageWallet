import PageContainer from "../../components/Layout/PageContainer";
import PageTitle from "../../components/Layout/PageTitle";
import Spinner from "../../components/Layout/Spinner";
import PageCard from "../../components/Layout/PageCard";
import AddModal from "./components/AddModal";
import TransactionsTable from "./components/TransactionTable";
import Error from "../../components/Layout/Error";
import { useTransactionsData } from "../../hooks/useTransactionsData";
import Layout from "../../components/Layout/Layout";
import { useFilter } from "../../hooks/useFilter";

const Transactions = () => {
  const { filterMonth, filterYear } = useFilter();

  // Get min and max dates for datepicker based on current filter selection
  const minDate = new Date(filterYear, filterMonth, 1)
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(filterYear, filterMonth + 1, 0)
    .toISOString()
    .split("T")[0];

  // Queries
  const { isPending, error, transactionsData, budgetData } =
    useTransactionsData(filterMonth, filterYear);

  // Show loading spinner if queries are pending
  if (isPending) {
    return <Spinner />;
  }

  // Show error message if query has error
  if (error || !transactionsData || !budgetData) {
    return <Error />;
  }

  return (
    <Layout>
      <PageContainer>
        <div className="flex flex-row justify-between">
          <PageTitle>Transactions</PageTitle>
          <AddModal
            minDate={minDate}
            maxDate={maxDate}
            budgetCategories={budgetData}
            filterMonth={filterMonth}
            filterYear={filterYear}
          />
        </div>
        <PageCard>
          <TransactionsTable
            transactions={transactionsData}
            budget={budgetData}
            filterMonth={filterMonth}
            filterYear={filterYear}
          />
        </PageCard>
      </PageContainer>
    </Layout>
  );
};

export default Transactions;
