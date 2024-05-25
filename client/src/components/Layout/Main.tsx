interface MainProps {
  children: JSX.Element | JSX.Element[];
}

const Main = ({ children }: MainProps) => {
  return <div className="h-full container mx-auto">{children}</div>;
};

export default Main;
