export interface BudgetCategory {
  id?: string;
  category: string;
  budget: number;
  current?: number;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
