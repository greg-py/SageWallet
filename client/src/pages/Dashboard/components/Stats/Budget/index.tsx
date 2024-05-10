import { BudgetCategory } from "../../../../../models/budget";
import { Transaction } from "../../../../../models/transaction";
import { calculateBudgetStats } from "../../../../../utils/dashboard";
import DashboardRow from "../../DashboardRow";
import StaticStat from "../StaticStat";

interface BudgetProps {
  budget: BudgetCategory[];
  transactions: Transaction[];
}

const Budget = ({ budget, transactions }: BudgetProps) => {
  const budgetStats = calculateBudgetStats(budget, transactions);

  return (
    <DashboardRow title="Monthly Budget">
      <StaticStat title="Budget" value={budgetStats.totalBudget} />
      <StaticStat
        title="Spend"
        value={budgetStats.totalSpend}
        success={budgetStats.isWithinBudget}
      />
      <StaticStat
        title="Spend (%)"
        value={budgetStats.spendPercentage && `${budgetStats.spendPercentage}%`}
        success={budgetStats.isWithinBudget}
        currency={false}
      />
      <StaticStat
        title="Remaining"
        value={budgetStats.spendRemaining}
        success={budgetStats.isWithinBudget}
      />
    </DashboardRow>
  );
};

export default Budget;
