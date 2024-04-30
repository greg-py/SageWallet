import { Transaction } from "../../../models/Transaction";
import { Badge } from "flowbite-react";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <>
      <div className="px-4 py-2 rounded-box grid grid-cols-3">
        <p className="col-span-2 text-xs font-bold">{transaction.vendor}</p>
        <div className="col-span-1 flex flex-row justify-between">
          <Badge>{transaction.category}</Badge>
          <p className="text-xs font-bold">${transaction.price}</p>
        </div>
      </div>
    </>
  );
};

export default TransactionItem;
