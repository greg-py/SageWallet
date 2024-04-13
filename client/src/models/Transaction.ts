export interface Transaction {
  id: string;
  date: string;
  vendor: string;
  price: number;
  category: string;
}

export const TransactionColumns = [
  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Vendor",
    accessor: "vendor",
  },
  {
    header: "Price",
    accessor: "price",
  },
  {
    header: "Category",
    accessor: "category",
  },
];
