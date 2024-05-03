import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { MONTHS, YEARS } from "../../../../config/constants";
import { Transaction } from "../../../../models/transaction";
import FilterModal from "../TransactionsList/FilterModal";

interface FiltersProps {
  filterMonth: number;
  setFilterMonth: React.Dispatch<React.SetStateAction<number>>;
  filterYear: number;
  setFilterYear: React.Dispatch<React.SetStateAction<number>>;
  transactions: Transaction[];
  filterCategories: string[];
  setFilterCategories: React.Dispatch<React.SetStateAction<string[]>>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Transaction[], Error>>;
}

const Filters = ({
  filterMonth,
  setFilterMonth,
  filterYear,
  setFilterYear,
  transactions,
  filterCategories,
  setFilterCategories,
  refetch,
}: FiltersProps) => {
  // Build and sort list of categories from transactions
  const categories: string[] = [];
  transactions.forEach((transaction) => {
    if (!categories.includes(transaction.category)) {
      categories.push(transaction.category);
    }
  });
  categories.sort();

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    const monthIndex = MONTHS.indexOf(selectedMonth);
    setFilterMonth(monthIndex);
  };

  return (
    <div className="mt-4 md:mt-6 2xl:mt-8">
      <div className="flex flex-col space-y-2 xl:flex-row xl:space-y-0 xl:space-x-4">
        <select
          className="select min-w-96 shadow-xl"
          value={MONTHS[filterMonth] ?? ""}
          onChange={(e) => handleMonthChange(e)}
        >
          <option disabled>Month</option>
          {MONTHS &&
            MONTHS.map((month) => {
              return <option key={month}>{month}</option>;
            })}
        </select>
        <select
          className="select min-w-96 shadow-xl"
          value={filterYear}
          onChange={(e) => setFilterYear(parseInt(e.target.value))}
        >
          <option disabled>Year</option>
          {YEARS &&
            YEARS.map((year) => {
              return <option key={year}>{year}</option>;
            })}
        </select>
        <button className="btn btn-neutral" onClick={() => refetch()}>
          Submit
        </button>
        <FilterModal
          categories={categories}
          filterCategories={filterCategories}
          setFilterCategories={setFilterCategories}
        />
      </div>
    </div>
  );
};

export default Filters;
