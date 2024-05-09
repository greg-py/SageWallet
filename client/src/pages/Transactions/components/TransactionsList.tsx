import { useState } from "react";
import { BudgetCategory } from "../../../models/budget";
import { Transaction } from "../../../models/transaction";
import { formatInTimeZone } from "date-fns-tz";
import {
  DATEPICKER_FORMAT_STRING,
  DATE_FORMAT_STRING,
} from "../../../config/constants";
import CurrencyText from "../../../components/UI/CurrencyText";
import EditModal from "./EditModal";

interface TransactionsListProps {
  transactions: Transaction[];
  budget: BudgetCategory[];
  filterMonth: number;
  filterYear: number;
}

const TransactionsList = ({
  transactions,
  budget,
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
    <>
      <ul role="list">
        {transactions &&
          transactions.map((transaction) => {
            const formattedDate = formatInTimeZone(
              transaction.date,
              "UTC",
              DATE_FORMAT_STRING
            );

            return (
              <li
                key={transaction.id}
                className="flex justify-between gap-x-4 p-4 rounded-box hover:cursor-pointer hover:bg-base-200"
                onClick={() => handleEditModalOpen(transaction)}
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6">
                      {transaction.vendor}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5">
                      {formattedDate ?? ""}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6">
                      {transaction.price && (
                        <CurrencyText value={transaction.price} />
                      )}
                    </p>
                    <p className="mt-1 text-xs leading-5 bg-accent text-base-100 px-2 pt-1 rounded-lg">
                      {transaction.category}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
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
        budgetCategories={budget}
        minDate={minDate}
        maxDate={maxDate}
        filterMonth={filterMonth}
        filterYear={filterYear}
      />
    </>
  );
};

export default TransactionsList;
