interface PageCardProps {
  children: JSX.Element | JSX.Element[];
}

const PageCard = ({ children }: PageCardProps) => {
  return (
    <div className="col-span-12 rounded-box bg-base-100 p-8 shadow-xl">
      {children}
    </div>
  );
};

export default PageCard;
