import { Transaction } from "../../../../models/transaction";
import AddModal from "./AddModal";
import Transactions from "./Transactions";
import EditModal from "./EditModal";
import { useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { DATEPICKER_FORMAT_STRING } from "../../../../config/constants";
import Spinner from "../../../../components/Layout/Spinner";

interface TransactionsListProps {
  transactions: Transaction[];
  filterCategories: string[];
  refetchPending: boolean;
}

const TransactionsList = ({
  transactions,
  filterCategories,
  refetchPending,
}: TransactionsListProps) => {
  // State for edit modal
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // Function for setting transaction edit state
  const initializeTransactionEdit = (transaction: Transaction) => {
    const formattedDate = formatInTimeZone(
      transaction.date,
      "UTC",
      DATEPICKER_FORMAT_STRING
    );

    setTransaction(transaction);
    setDate(formattedDate);
    setVendor(transaction.vendor);
    setAmount(transaction.price);
    setCategory(transaction.category);
  };

  // Filter the transactions if a filter category is chosen
  const filteredTransactions = filterCategories.length
    ? transactions.filter((transaction) =>
        filterCategories.includes(transaction.category)
      )
    : transactions;

  const handleEditModalOpen = (transaction: Transaction) => {
    initializeTransactionEdit(transaction);
    (
      document.getElementById("edit_transaction_modal") as HTMLDialogElement
    )?.showModal();
  };

  const handleEditModalClose = () => {
    (
      document.getElementById("edit_transaction_modal") as HTMLDialogElement
    )?.close();
  };

  return (
    <div className="col-span-12 h-96 rounded-box scrollable-rounded max-h-full bg-base-100 overflow-y-scroll p-8 shadow-xl xl:col-span-6">
      {refetchPending ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-row justify-between">
            <h2 className="font-bold text-xl">Transactions</h2>
            <AddModal />
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
        </>
      )}
    </div>
  );
};

export default TransactionsList;
