import Card from "../../../../components/Layout/Card";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-6 xl:grid-cols-4 2xl:gap-8">
      <Card title="Cash Balance">
        <p className="text-success">$85,000</p>
      </Card>
      <Card title="Current Debt">
        <p className="text-error">$114,000</p>
      </Card>
      <Card title="Investments">
        <p className="text-success">$11,000</p>
      </Card>
      <Card title="Net Worth">
        <p className="text-error">-$17,000</p>
      </Card>
    </div>
  );
};

export default StatsGrid;
