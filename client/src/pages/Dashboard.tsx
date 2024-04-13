import { useState } from "react";

import LoadingSpinner from "../components/layout/LoadingSpinner";
import { Transaction } from "../models/Transaction";
import TransactionsSection from "../components/dashboard/transactions/TransactionsSection";
import useFetch from "../hooks/useFetch";
import { formatTransactionsData } from "../utils/formatData";

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:3000/Transactions";

  // Fetch transactions data
  useFetch<Transaction[]>({
    url,
    setLoading,
    setError,
    setData: setTransactions,
    transformData: formatTransactionsData,
  });

  // Return loading spinner if data is loading
  if (loading) {
    return <LoadingSpinner />;
  }

  // Return error on page if error fetching data
  if (error) {
    return <div>{error}</div>;
  }

  // Otherwise return Transactions section with table
  return (
    <div className="grid grid-cols-1 space-y-4 lg:grid-cols-2 lg:gap-4 lg:space-y-0">
      <TransactionsSection data={transactions} />
    </div>
  );
};

export default Dashboard;
