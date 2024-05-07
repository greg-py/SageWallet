interface DashboardCardProps {
  size?: "sm" | "md" | "lg";
  children: JSX.Element | JSX.Element[];
}

const DashboardCard = ({ size = "lg", children }: DashboardCardProps) => {
  if (size === "sm") {
    return (
      <div className="col-span-6 rounded-box max-h-full bg-base-100 p-8 shadow-xl xl:col-span-3">
        {children}
      </div>
    );
  }

  return (
    <div className="col-span-12 rounded-box h-96 max-h-full overflow-y-scroll scrollable-rounded bg-base-100 p-8 shadow-xl xl:col-span-6">
      {children}
    </div>
  );
};

export default DashboardCard;
