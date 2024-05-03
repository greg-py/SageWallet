import { formatInTimeZone } from "date-fns-tz";
import { Transaction } from "../../../../models/transaction";
import { DATE_FORMAT_STRING } from "../../../../config/constants";

interface TransactionsProps {
  transactions: Transaction[];
  handleEdit: (transaction: Transaction) => void;
}

const Transactions = ({ transactions, handleEdit }: TransactionsProps) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
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
              onClick={() => handleEdit(transaction)}
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
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6">
                  {transaction.price && `$${transaction.price}`}
                </p>
                <p className="mt-1 text-xs leading-5 badge badge-neutral">
                  {transaction.category}
                </p>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Transactions;
