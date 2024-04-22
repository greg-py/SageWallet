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
    <div className="p-4 mt-4 rounded-md outline outline-1 outline-slate-300 flex flex-col space-y-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-xl text-center">Transactions</h1>
        <AddTransactionModal />
      </div>
      <div className="max-h-96 overflow-y-scroll hide-scrollbar">
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
    </div>
  );
};

export default TransactionSection;
