import { useState } from "react";

import LoadingSpinner from "../components/layout/LoadingSpinner";
import { Transaction } from "../models/Transaction";
import TransactionsSection from "../components/dashboard/transactions/TransactionsSection";
import useFetch from "../hooks/useFetch";
import {
  calculateBudgetActuals,
  formatTransactionsData,
} from "../utils/formatData";
import { Budget } from "../models/Budget";
import BudgetSection from "../components/dashboard/budget/BudgetSection";

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Budget[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const transactionsUrl = "http://localhost:3000/Transactions";
  const budgetUrl = "http://localhost:3000/Budget";

  // Fetch transactions data
  useFetch<Transaction[], Transaction[]>({
    url: transactionsUrl,
    setLoading,
    setError,
    setData: setTransactions,
    transformData: formatTransactionsData,
  });

  // Fetch budget data
  useFetch<Budget[], Transaction[]>({
    url: budgetUrl,
    setLoading,
    setError,
    setData: setBudget,
    transformData: calculateBudgetActuals,
    auxiliaryData: transactions,
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
      <TransactionsSection data={transactions} setData={setTransactions} />
      <BudgetSection data={budget} setData={setBudget} />
    </div>
  );
};

export default Dashboard;
