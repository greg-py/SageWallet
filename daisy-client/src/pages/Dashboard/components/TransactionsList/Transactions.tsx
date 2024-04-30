import { format } from "date-fns";
import { DATE_FORMAT_STRING } from "../../../../config/constants";
import { Transaction } from "../../../../models/transaction";

interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions = ({ transactions }: TransactionsProps) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {transactions &&
        transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between gap-x-4 p-4 rounded-box hover:cursor-pointer hover:bg-base-200"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6">
                  {transaction.vendor}
                </p>
                <p className="mt-1 truncate text-xs leading-5">
                  {transaction.date &&
                    format(transaction.date, DATE_FORMAT_STRING)}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6">
                {transaction.price && `$${transaction.price}`}
              </p>
              <p className="mt-1 text-xs leading-5 badge badge-primary">
                {transaction.category}
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Transactions;
