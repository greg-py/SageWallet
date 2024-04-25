import { Select } from "flowbite-react";
import { Transaction } from "../../../models/Transaction";
import { createFilterCategories } from "../../../utils/transactionUtils";

interface TransactionFilterProps {
  transactions: Transaction[];
  filterCategory: string;
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
}

const TransactionFilter = ({
  transactions,
  filterCategory,
  setFilterCategory,
}: TransactionFilterProps) => {
  const filterOptions = createFilterCategories(transactions);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
  };

  return (
    <div className="max-w-full flex flex-row space-x-4 items-end">
      <Select
        id="filter"
        required
        value={filterCategory}
        onChange={(e) => handleChange(e)}
      >
        {filterOptions.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </Select>
    </div>
  );
};

export default TransactionFilter;
