interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

const Container = ({ children }: ContainerProps) => {
  return <div className="bg-slate-200 min-h-screen">{children}</div>;
};

export default Container;
