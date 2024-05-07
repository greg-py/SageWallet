import DashboardCard from "../DashboardCard";

interface CurrentSpendProps {
  value: number;
}

const CurrentSpend = ({ value }: CurrentSpendProps) => {
  return (
    <DashboardCard size="sm">
      <h2 className="font-bold text-xl">Amount Spent</h2>
      <div>{value}</div>
    </DashboardCard>
  );
};

export default CurrentSpend;
