import DashboardCard from "../DashboardCard";

interface StatsCardProps {
  title: string;
  value: string | null;
  success?: boolean;
}

const StatsCard = ({ title, value, success }: StatsCardProps) => {
  return (
    <DashboardCard size="sm">
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-bold text-lg xl:text-xl">{title}</h2>
        <p
          className={`text-xl ${
            success === true
              ? "text-success"
              : success === false
              ? "text-error"
              : null
          }`}
        >
          {value}
        </p>
      </div>
    </DashboardCard>
  );
};

export default StatsCard;
