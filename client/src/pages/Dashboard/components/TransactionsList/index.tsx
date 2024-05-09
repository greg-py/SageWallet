import { Transaction } from "../../../../models/transaction";
import Transactions from "./Transactions";
import DashboardCard from "../DashboardCard";

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList = ({ transactions }: TransactionsListProps) => {
  return (
    <DashboardCard>
      <h2 className="font-bold text-xl">Recent Transactions</h2>
      <Transactions transactions={transactions} />
    </DashboardCard>
  );
};

export default TransactionsList;
