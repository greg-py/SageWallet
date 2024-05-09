import DashboardRow from "../../DashboardRow";
import StaticStat from "../StaticStat";

const Income = () => {
  return (
    <DashboardRow title="Income">
      <StaticStat title="Total ($)" value={0} />
      <StaticStat title="vs. Budget ($)" value={0} />
      <StaticStat title="vs. Spent ($)" value={0} />
    </DashboardRow>
  );
};

export default Income;
