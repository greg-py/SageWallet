interface DashboardCardProps {
  children: JSX.Element | JSX.Element[];
}

const DashboardCard = ({ children }: DashboardCardProps) => {
  return (
    <div className="col-span-12 rounded-box h-96 max-h-full overflow-y-scroll scrollable-rounded bg-base-100 p-8 shadow-xl xl:col-span-6">
      {children}
    </div>
  );
};

export default DashboardCard;
