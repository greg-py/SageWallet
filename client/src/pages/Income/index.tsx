import PageCard from "../../components/Layout/PageCard";
import PageContainer from "../../components/Layout/PageContainer";
import PageTitle from "../../components/Layout/PageTitle";
import AddModal from "./components/AddModal";
import IncomeTable from "./components/IncomeTable";
import Spinner from "../../components/Layout/Spinner";
import Error from "../../components/Layout/Error";
import { useIncomeData } from "../../hooks/useIncomeData";
import Layout from "../../components/Layout/Layout";
import { useFilter } from "../../hooks/useFilter";

const Income = () => {
  const { filterMonth, filterYear } = useFilter();

  // Get min and max dates for datepicker based on current filter selection
  const minDate = new Date(filterYear, filterMonth, 1)
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(filterYear, filterMonth + 1, 0)
    .toISOString()
    .split("T")[0];

  // Queries
  const { isPending, error, data } = useIncomeData(filterMonth, filterYear);

  // Show loading spinner if queries are pending
  if (isPending) {
    return <Spinner />;
  }

  // Show error message if query has error
  if (error || !data) {
    return <Error />;
  }

  return (
    <Layout>
      <PageContainer>
        <div className="flex flex-row justify-between">
          <PageTitle>Income</PageTitle>
          <AddModal
            minDate={minDate}
            maxDate={maxDate}
            filterMonth={filterMonth}
            filterYear={filterYear}
          />
        </div>
        <PageCard>
          <IncomeTable
            income={data}
            filterMonth={filterMonth}
            filterYear={filterYear}
          />
        </PageCard>
      </PageContainer>
    </Layout>
  );
};

export default Income;
