import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { MONTHS, YEARS } from "../../../../config/constants";
import { DashboardData } from "../../../../models/dashboard";

interface FiltersProps {
  filterMonth: number;
  setFilterMonth: React.Dispatch<React.SetStateAction<number>>;
  filterYear: number;
  setFilterYear: React.Dispatch<React.SetStateAction<number>>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<DashboardData, Error>>;
}

const Filters = ({
  filterMonth,
  setFilterMonth,
  filterYear,
  setFilterYear,
  refetch,
}: FiltersProps) => {
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    const monthIndex = MONTHS.indexOf(selectedMonth);
    setFilterMonth(monthIndex);
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-8">
      <div className="col-span-12 xl:col-span-3">
        <select
          className="select w-full shadow-xl"
          value={MONTHS[filterMonth] ?? ""}
          onChange={(e) => handleMonthChange(e)}
        >
          <option disabled>Month</option>
          {MONTHS &&
            MONTHS.map((month) => {
              return <option key={month}>{month}</option>;
            })}
        </select>
      </div>
      <div className="col-span-12 xl:col-span-3">
        <select
          className="select w-full shadow-xl"
          value={filterYear}
          onChange={(e) => setFilterYear(parseInt(e.target.value))}
        >
          <option disabled>Year</option>
          {YEARS &&
            YEARS.map((year) => {
              return <option key={year}>{year}</option>;
            })}
        </select>
      </div>
      <button
        className="btn btn-primary shadow-xl min-w-fit"
        onClick={() => refetch()}
      >
        Submit
      </button>
    </div>
  );
};

export default Filters;
