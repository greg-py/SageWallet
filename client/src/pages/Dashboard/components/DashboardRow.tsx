interface DashboardRowProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

const DashboardRow = ({ title, children }: DashboardRowProps) => {
  return (
    <div className="mt-4 md:mt-6 2xl:mt-8 space-y-2">
      {title && <h2 className="text-xl font-bold xl:text-2xl">{title}</h2>}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardRow;
