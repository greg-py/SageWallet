import { useEffect, useState } from "react";
import { Transaction } from "../../../models/Transaction";
import { groupTransactionsByDate } from "../../../utils/dateUtils";
import AddTransactionModal from "./AddTransactionModal";
import TransactionGroup from "./TransactionGroup";
import TransactionFilter from "./TransactionFilter";
import { FILTER_CATEGORIES_ALL_STRING } from "../../../config/constants";

interface TransactionSectionProps {
  transactions: Transaction[];
}

const TransactionSection = ({ transactions }: TransactionSectionProps) => {
  const [filterCategory, setFilterCategory] = useState(
    FILTER_CATEGORIES_ALL_STRING
  );
  const [groupedTransactions, setGroupedTransactions] = useState<
    Record<string, Transaction[]>
  >({});

  // Group transactions by date and filter by selected category
  useEffect(() => {
    const result = groupTransactionsByDate(transactions, filterCategory);
    if (result) {
      setGroupedTransactions(result);
    } else {
      setGroupedTransactions({});
    }
  }, [transactions, filterCategory, setGroupedTransactions]);

  return (
    <div className="p-4 rounded-box flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center">
        <h1 className="font-bold text-xl">Transactions</h1>
        <div className="flex flex-row space-x-4 items-end">
          <TransactionFilter
            transactions={transactions}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
          <AddTransactionModal />
        </div>
      </div>
      <div className="max-h-96 overflow-y-scroll hide-scrollbar">
        {Object.keys(groupedTransactions).map((date) => {
          return (
            <TransactionGroup
              key={date}
              date={date}
              transactions={groupedTransactions[date]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TransactionSection;
