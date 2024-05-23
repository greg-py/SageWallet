import { formatInTimeZone } from "date-fns-tz";
import { Transaction } from "../../../models/transaction";
import {
  calculateTotalSpend,
  filterTransactions,
} from "../../../utils/transaction";
import { DATE_FORMAT_STRING } from "../../../config/constants";
import CurrencyText from "../../../components/UI/CurrencyText";

interface CategoryModalProps {
  transactions: Transaction[];
  category: string;
}

const CategoryModal = ({ transactions, category }: CategoryModalProps) => {
  const filteredTransactions = filterTransactions(transactions, category);
  const totalSpend = calculateTotalSpend(filteredTransactions);

  return (
    <dialog id="filter_category_modal" className="modal">
      <div className="modal-box w-full max-w-2xl">
        <form method="dialog">
          <button className="btn btn-ghost absolute right-2 top-2">x</button>
        </form>
        <h3 className="font-bold text-lg">{`${category} Transactions`}</h3>
        <div className="h-96 p-4 space-y-4 overflow-x-auto overflow-y-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Vendor</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions &&
                filteredTransactions.map((transaction) => {
                  const formattedDate = formatInTimeZone(
                    transaction.date,
                    "UTC",
                    DATE_FORMAT_STRING
                  );

                  return (
                    <tr key={transaction.id}>
                      <th>{formattedDate ?? ""}</th>
                      <th>{transaction.vendor}</th>
                      <th>
                        <CurrencyText value={transaction.price} />
                      </th>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot className="border-t border-accent">
              <tr>
                <th>Totals</th>
                <th></th>
                <th>
                  {totalSpend && <CurrencyText value={totalSpend.toString()} />}
                </th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </dialog>
  );
};

export default CategoryModal;
