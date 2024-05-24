interface PageTitleProps {
  children: string;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <div className="mb-4 w-full">
      <h1 className="text-3xl font-bold">{children}</h1>
    </div>
  );
};

export default PageTitle;
