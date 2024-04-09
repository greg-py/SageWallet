interface BudgetCategory {
  category: string;
  budget: number;
  actual: number;
  difference: number;
}

export const budgetData: BudgetCategory[] = [
  {
    category: "Rent",
    budget: 2150,
    actual: 2150,
    difference: 0,
  },
  {
    category: "Utilities",
    budget: 350,
    actual: 35,
    difference: -315,
  },
  {
    category: "Groceries",
    budget: 600,
    actual: 124,
    difference: -476,
  },
];
