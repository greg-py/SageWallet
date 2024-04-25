import { format, parseISO } from "date-fns";
import { Transaction } from "../models/Transaction";
import {
  DATE_FORMAT_STRING,
  FILTER_CATEGORIES_ALL_STRING,
} from "../config/constants";

/**
 * Groups transactions by their date (day).
 * @param transactions Array of transactions.
 * @returns Grouped transactions by date.
 */
export const groupTransactionsByDate = (
  transactions: Transaction[],
  filterCategory: string = FILTER_CATEGORIES_ALL_STRING
) => {
  const grouped: Record<string, Transaction[]> = {};

  transactions.forEach((transaction) => {
    if (
      filterCategory !== FILTER_CATEGORIES_ALL_STRING &&
      transaction.category !== filterCategory
    ) {
      return;
    }

    // Extract the date part only
    const dateKey = format(
      parseISO(transaction.date.split("T")[0]),
      DATE_FORMAT_STRING,
      {}
    ); // Splits at 'T' and takes the first part (YYYY-MM-DD)

    // Check if the key exists, if not initialize it
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    // Push the current transaction to the correct date bucket
    grouped[dateKey].push(transaction);
  });

  return grouped;
};
