import { Transaction } from "../models/Transaction";

export const formatTransactionsData = (data: Transaction[]) => {
  const sortedData = data.sort((a: Transaction, b: Transaction) => {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  });

  sortedData.forEach(
    (item) => (item.date = new Date(item.date).toLocaleDateString("en-us"))
  );

  return sortedData;
};
