import { formatInTimeZone } from "date-fns-tz";
import CurrencyText from "../../../components/UI/CurrencyText";
import { Income } from "../../../models/income";
import { DATE_FORMAT_STRING } from "../../../config/constants";
import { calculateIncomeTotals } from "../../../utils/income";
import EditModal from "./EditModal";
import { useState } from "react";

interface IncomeTableProps {
  income: Income[];
  filterMonth: number;
  filterYear: number;
}

const IncomeTable = ({ income, filterMonth, filterYear }: IncomeTableProps) => {
  const incomeTotal = calculateIncomeTotals(income);

  // Get min and max dates for datepicker based on current filter selection
  const minDate = new Date(filterYear, filterMonth, 1)
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(filterYear, filterMonth + 1, 0)
    .toISOString()
    .split("T")[0];

  // Component state
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  const initializeIncomeEdit = (income: Income) => {
    if (!income.id) {
      return;
    }

    setId(income.id);
    setDate(income.date);
    setSource(income.source);
    setAmount(income.amount);
  };

  const handleEditModalOpen = (income: Income) => {
    initializeIncomeEdit(income);
    (
      document.getElementById("edit_income_modal") as HTMLDialogElement
    )?.showModal();
  };

  const handleEditModalClose = () => {
    (
      document.getElementById("edit_income_modal") as HTMLDialogElement
    )?.close();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Source</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {income &&
              income.map((data) => {
                const formattedDate = formatInTimeZone(
                  data.date,
                  "UTC",
                  DATE_FORMAT_STRING
                );

                return (
                  <tr
                    key={data.id}
                    className="hover:cursor-pointer hover:bg-base-200"
                    onClick={() => handleEditModalOpen(data)}
                  >
                    <th>{formattedDate}</th>
                    <th>{data.user}</th>
                    <th>{data.source}</th>
                    <th>
                      <CurrencyText value={data.amount} />
                    </th>
                  </tr>
                );
              })}
          </tbody>
          <tfoot className="border-t border-accent">
            <tr>
              <th>Totals</th>
              <th></th>
              <th></th>
              <th>{<CurrencyText value={incomeTotal?.toString()} />}</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <EditModal
        id={id}
        date={date}
        setDate={setDate}
        source={source}
        setSource={setSource}
        amount={amount}
        setAmount={setAmount}
        handleClose={handleEditModalClose}
        minDate={minDate}
        maxDate={maxDate}
        filterMonth={filterMonth}
        filterYear={filterYear}
      />
    </>
  );
};

export default IncomeTable;
