import { Transaction } from "../../../../models/transaction";
import FilterModal from "./FilterModal";
import AddModal from "./AddModal";
import Transactions from "./Transactions";

interface TransactionsListProps {
  data: Transaction[];
  filterCategories: string[];
  setFilterCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const TransactionsList = ({
  data,
  filterCategories,
  setFilterCategories,
}: TransactionsListProps) => {
  // Build and sort list of categories from transactions
  const categories: string[] = [];
  data.forEach((transaction) => {
    if (!categories.includes(transaction.category)) {
      categories.push(transaction.category);
    }
  });
  categories.sort();

  // Filter the transactions if a filter category is chosen
  const transactions = filterCategories.length
    ? data.filter((transaction) =>
        filterCategories.includes(transaction.category)
      )
    : data;

  return (
    <div className="col-span-12 rounded-2xl max-h-full bg-base-100 overflow-y-scroll p-8 shadow-xl xl:col-span-6">
      <h2 className="font-bold text-xl">Transactions</h2>
      <FilterModal
        categories={categories}
        filterCategories={filterCategories}
        setFilterCategories={setFilterCategories}
      />
      <AddModal />
      <Transactions transactions={transactions} />
    </div>
  );
};

export default TransactionsList;
