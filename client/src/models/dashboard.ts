import { BudgetCategory } from "./budget";
import { Transaction } from "./transaction";

export interface DashboardData {
  transactions: Transaction[];
  currentSpend: number;
  budgets: BudgetCategory[];
  budgetTotal: number;
  percentageSpent: number;
  spendRemaining: number;
}
