import { Transaction } from "../../../models/Transaction";
import { groupTransactionsByDate } from "../../../utils/dateUtils";
import AddTransactionModal from "./AddTransactionModal";
import TransactionGroup from "./TransactionGroup";

interface TransactionSectionProps {
  transactions: Transaction[];
}

const TransactionSection = ({ transactions }: TransactionSectionProps) => {
  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <div className="p-4 max-h-screen overflow-y-scroll overflow-x-scroll rounded-md flex flex-col space-y-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-xl text-center">Transactions</h1>
        <AddTransactionModal />
      </div>
      {groupedTransactions &&
        Object.keys(groupedTransactions).map((obj) => {
          return (
            <TransactionGroup
              key={obj}
              date={obj}
              transactions={groupedTransactions[obj]}
            />
          );
        })}
    </div>
  );
};

export default TransactionSection;
