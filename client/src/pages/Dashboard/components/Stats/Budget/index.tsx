import DashboardRow from "../../DashboardRow";
import StaticStat from "../StaticStat";

interface BudgetProps {
  budget: number;
  spend: number;
  spendPercentage: string | null;
  remaining: number;
  isWithinBudget: boolean;
}

const Budget = ({
  budget,
  spend,
  spendPercentage,
  remaining,
  isWithinBudget,
}: BudgetProps) => {
  return (
    <DashboardRow title="Monthly Budget">
      <StaticStat title="Budget" value={budget} />
      <StaticStat title="Spend" value={spend} success={isWithinBudget} />
      <StaticStat
        title="Spend (%)"
        value={spendPercentage}
        success={isWithinBudget}
        currency={false}
      />
      <StaticStat
        title="Remaining"
        value={remaining}
        success={isWithinBudget}
      />
    </DashboardRow>
  );
};

export default Budget;
