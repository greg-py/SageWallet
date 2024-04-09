interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

const Container = ({ children }: ContainerProps) => {
  return <div className="bg-gray container mx-auto">{children}</div>;
};

export default Container;
