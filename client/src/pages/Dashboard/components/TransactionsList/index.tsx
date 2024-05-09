import { Transaction } from "../../../../models/transaction";
import AddModal from "./AddModal";
import Transactions from "./Transactions";
import EditModal from "./EditModal";
import { useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { DATEPICKER_FORMAT_STRING } from "../../../../config/constants";
import Spinner from "../../../../components/Layout/Spinner";
import { BudgetCategory } from "../../../../models/budget";
import DashboardCard from "../DashboardCard";

interface TransactionsListProps {
  transactions: Transaction[];
  refetchPending: boolean;
  budgetCategories: BudgetCategory[];
  filterMonth: number;
  filterYear: number;
}

const TransactionsList = ({
  transactions,
  refetchPending,
  budgetCategories,
  filterMonth,
  filterYear,
}: TransactionsListProps) => {
  // State for edit modal
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // Get min and max dates for datepicker based on current filter selection
  const minDate = new Date(filterYear, filterMonth, 1)
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(filterYear, filterMonth + 1, 0)
    .toISOString()
    .split("T")[0];

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
    <DashboardCard>
      {refetchPending ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-row justify-between">
            <h2 className="font-bold text-xl">Transactions</h2>
            <AddModal
              budgetCategories={budgetCategories}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
          <Transactions
            transactions={transactions}
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
            budgetCategories={budgetCategories}
            minDate={minDate}
            maxDate={maxDate}
          />
        </>
      )}
    </DashboardCard>
  );
};

export default TransactionsList;
