export interface Budget {
  id: string;
  category: string;
  budget: number;
  actual?: number;
}

export const BudgetColumns = [
  {
    header: "Category",
    accessor: "category",
  },
  {
    header: "Budget",
    accessor: "budget",
  },
  {
    header: "Actual",
    accessor: "actual",
  },
];
