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
    <DashboardRow title="Balances">
      <StaticStat title="Cash" value={calculatedBalances.totalCash} />
      <StaticStat title="Assets" value={calculatedBalances.totalAssets} />
      <StaticStat
        title="Investments"
        value={calculatedBalances.totalInvestments}
      />
      <StaticStat title="Debt" value={calculatedBalances.totalDebt} />
    </DashboardRow>
  );
};

export default Balances;
