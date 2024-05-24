interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

const AppContainer = ({ children }: ContainerProps) => {
  return (
    <div className="h-screen flex flex-col justify-between">{children}</div>
  );
};

export default AppContainer;
