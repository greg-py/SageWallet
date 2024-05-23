import { DASHBOARD_TRANSACTION_COUNT } from "../config/constants";
import { Transaction } from "../models/transaction";

export const handleAmountChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  const value = e.target.value;
  const regex = /^[0-9]*\.?[0-9]{0,2}$/; // Regex to limit to two decimal places

  if (value === "" || regex.test(value)) {
    setState(value);
  }
};

export const returnRecentTransactions = (transactions: Transaction[]) => {
  return transactions.slice(0, DASHBOARD_TRANSACTION_COUNT);
};

export const calculateTotalSpend = (transactions: Transaction[]) => {
  let totalSpend = 0;
  transactions &&
    transactions.forEach((transaction) => {
      totalSpend += parseFloat(transaction.price);
    });
  totalSpend = parseFloat(totalSpend.toFixed(2));

  return totalSpend;
};

export const filterTransactions = (
  transactions: Transaction[],
  category: string
) => {
  return transactions.filter(
    (transaction) => transaction.category === category
  );
};
