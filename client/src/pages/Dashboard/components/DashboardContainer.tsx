interface DashboardContainerProps {
  children: JSX.Element | JSX.Element[];
}

const DashboardContainer = ({ children }: DashboardContainerProps) => {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      {children}
    </div>
  );
};

export default DashboardContainer;
