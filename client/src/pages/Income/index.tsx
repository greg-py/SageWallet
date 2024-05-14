import { useAuth0 } from "@auth0/auth0-react";
import PageCard from "../../components/Layout/PageCard";
import PageContainer from "../../components/Layout/PageContainer";
import PageTitle from "../../components/Layout/PageTitle";
import AddModal from "./components/AddModal";
import IncomeTable from "./components/IncomeTable";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Layout/Spinner";
import { incomeQuery } from "../../api/queries/defs/income";
import Error from "../../components/Layout/Error";

interface IncomeProps {
  filterMonth: number;
  filterYear: number;
}

const Income = ({ filterMonth, filterYear }: IncomeProps) => {
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
    isPending: isIncomePending,
    error: incomeError,
    data: income,
  } = useQuery(incomeQuery(userId, filterMonth, filterYear));

  // Show loading spinner if queries are pending
  if (isIncomePending) {
    return <Spinner />;
  }

  // Show error message if query has error
  if (incomeError) {
    return <Error />;
  }

  return (
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
          income={income}
          filterMonth={filterMonth}
          filterYear={filterYear}
        />
      </PageCard>
    </PageContainer>
  );
};

export default Income;
