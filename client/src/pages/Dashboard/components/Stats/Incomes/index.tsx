import { BudgetCategory } from "../../../../../models/budget";
import { Income } from "../../../../../models/income";
import { Transaction } from "../../../../../models/transaction";
import { calculateIncomeStats } from "../../../../../utils/income";
import DashboardRow from "../../DashboardRow";
import StaticStat from "../StaticStat";

interface IncomeProps {
  income: Income[];
  budget: BudgetCategory[];
  transactions: Transaction[];
}

const Incomes = ({ income, budget, transactions }: IncomeProps) => {
  const incomeStats = calculateIncomeStats(income, budget, transactions);

  return (
    <DashboardRow title="Income">
      <StaticStat title="Total ($)" value={incomeStats.totalIncome} />
      <StaticStat
        title="vs. Budget ($)"
        value={incomeStats.incomeToBudget}
        success={incomeStats.incomeToBudget > 0}
      />
      <StaticStat
        title="vs. Spent ($)"
        value={incomeStats.incomeToSpend}
        success={incomeStats.incomeToSpend > 0}
      />
    </DashboardRow>
  );
};

export default Incomes;
