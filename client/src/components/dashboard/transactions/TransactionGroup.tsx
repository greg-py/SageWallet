import { Transaction } from "../../../models/Transaction";
import TransactionItem from "./TransactionItem";

interface TransactionGroupProps {
  date: string;
  transactions: Transaction[];
}

const TransactionGroup = ({ date, transactions }: TransactionGroupProps) => {
  return (
    <div>
      <p className="uppercase text-sm text-gray-500">{date}</p>
      <div>
        {transactions &&
          transactions.map((item) => {
            return <TransactionItem key={item.id} transaction={item} />;
          })}
      </div>
    </div>
  );
};

export default TransactionGroup;
