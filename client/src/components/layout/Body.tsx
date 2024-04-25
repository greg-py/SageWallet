interface BodyProps {
  children: JSX.Element | JSX.Element[];
}

const Body = ({ children }: BodyProps) => {
  return <div>{children}</div>;
};

export default Body;
