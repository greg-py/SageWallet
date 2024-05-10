interface DashboardCardProps {
  children: JSX.Element | JSX.Element[];
}

const DashboardCard = ({ children }: DashboardCardProps) => {
  return (
    <div className="col-span-12 rounded-box max-h-full bg-base-100 p-8 shadow-xl xl:col-span-6">
      {children}
    </div>
  );
};

export default DashboardCard;
