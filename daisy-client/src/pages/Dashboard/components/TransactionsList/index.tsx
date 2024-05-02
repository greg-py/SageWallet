import { Transaction } from "../../../../models/transaction";
import FilterModal from "./FilterModal";
import AddModal from "./AddModal";
import Transactions from "./Transactions";
import EditModal from "./EditModal";
import { useState } from "react";
import { format } from "date-fns";
import { DATEPICKER_FORMAT_STRING } from "../../../../config/constants";

interface TransactionsListProps {
  transactions: Transaction[];
  filterCategories: string[];
  setFilterCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const TransactionsList = ({
  transactions,
  filterCategories,
  setFilterCategories,
}: TransactionsListProps) => {
  // State for edit modal
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // Function for setting transaction edit state
  const initializeTransactionEdit = (transaction: Transaction) => {
    setTransaction(transaction);
    setDate(format(transaction.date, DATEPICKER_FORMAT_STRING));
    setVendor(transaction.vendor);
    setAmount(transaction.price);
    setCategory(transaction.category);
  };

  // Build and sort list of categories from transactions
  const categories: string[] = [];
  transactions.forEach((transaction) => {
    if (!categories.includes(transaction.category)) {
      categories.push(transaction.category);
    }
  });
  categories.sort();

  // Filter the transactions if a filter category is chosen
  const filteredTransactions = filterCategories.length
    ? transactions.filter((transaction) =>
        filterCategories.includes(transaction.category)
      )
    : transactions;

  const handleEditModalOpen = (transaction: Transaction) => {
    initializeTransactionEdit(transaction);
    (document.getElementById("edit_modal") as HTMLDialogElement)?.showModal();
  };

  const handleEditModalClose = () => {
    (document.getElementById("edit_modal") as HTMLDialogElement)?.close();
  };

  return (
    <div className="col-span-12 rounded-box scrollable-rounded max-h-full bg-base-100 overflow-y-scroll p-8 shadow-xl xl:col-span-6">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-xl">Transactions</h2>
        <div className="space-x-2">
          <FilterModal
            categories={categories}
            filterCategories={filterCategories}
            setFilterCategories={setFilterCategories}
          />
          <AddModal />
        </div>
      </div>
      <Transactions
        transactions={filteredTransactions}
        handleEdit={handleEditModalOpen}
      />
      <EditModal
        transaction={transaction}
        date={date}
        setDate={setDate}
        vendor={vendor}
        setVendor={setVendor}
        amount={amount}
        setAmount={setAmount}
        category={category}
        setCategory={setCategory}
        handleClose={handleEditModalClose}
      />
    </div>
  );
};

export default TransactionsList;
