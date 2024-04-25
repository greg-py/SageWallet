interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="bg-slate-200 min-h-screen flex flex-col justify-between space-y-4 lg:space-y-0">
      {children}
    </div>
  );
};

export default Container;
