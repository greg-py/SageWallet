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

interface TransactionsTableProps {
  transactions: Transaction[];
  budget: BudgetCategory[];
  filterMonth: number;
  filterYear: number;
}

const TransactionsTable = ({
  transactions,
  budget,
  filterMonth,
  filterYear,
}: TransactionsTableProps) => {
  // State for edit modal
  const [id, setId] = useState("");
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
    if (!transaction.id) {
      return;
    }

    const formattedDate = formatInTimeZone(
      transaction.date,
      "UTC",
      DATEPICKER_FORMAT_STRING
    );

    setId(transaction.id);
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
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction) => {
                const formattedDate = formatInTimeZone(
                  transaction.date,
                  "UTC",
                  DATE_FORMAT_STRING
                );

                return (
                  <tr
                    key={transaction.id}
                    className="hover:cursor-pointer hover:bg-base-200"
                    onClick={() => handleEditModalOpen(transaction)}
                  >
                    <th>{formattedDate ?? ""}</th>
                    <th>{transaction.vendor}</th>
                    <th>
                      <CurrencyText value={transaction.price} />
                    </th>
                    <th>{transaction.category}</th>
                  </tr>
                );
              })}
          </tbody>
          <tfoot className="border-t border-accent">
            <tr>
              <th>Totals</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <EditModal
        id={id}
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

export default TransactionsTable;
