interface DashboardRowProps {
  children: JSX.Element | JSX.Element[];
}

const DashboardRow = ({ children }: DashboardRowProps) => {
  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-8 2xl:gap-8">
      {children}
    </div>
  );
};

export default DashboardRow;
