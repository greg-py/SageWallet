import DashboardRow from "../../DashboardRow";
import StaticStat from "../StaticStat";

const Balances = () => {
  return (
    <DashboardRow title="Total Balances">
      <StaticStat title="Cash" value={0} />
      <StaticStat title="Investments" value={0} />
      <StaticStat title="Debt" value={0} />
      <StaticStat title="Net Worth" value={0} />
    </DashboardRow>
  );
};

export default Balances;
