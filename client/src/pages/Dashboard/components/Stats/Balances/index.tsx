import { BalancesCategory } from "../../../../../models/balances";
import { calculateBalanceStats } from "../../../../../utils/balance";
import DashboardRow from "../../DashboardRow";
import StaticStat from "../StaticStat";

interface BalancesProps {
  balances: BalancesCategory[];
}

const Balances = ({ balances }: BalancesProps) => {
  const calculatedBalances = calculateBalanceStats(balances);

  return (
    <DashboardRow title="Total Balances">
      <StaticStat title="Cash" value={calculatedBalances.totalCash} />
      <StaticStat
        title="Investments"
        value={calculatedBalances.totalInvestments}
      />
      <StaticStat title="Debt" value={calculatedBalances.totalDebt} />
      <StaticStat title="Net Worth" value={calculatedBalances.netWorth} />
    </DashboardRow>
  );
};

export default Balances;
