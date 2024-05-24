interface PageContainerProps {
  children: JSX.Element | JSX.Element[];
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      {children}
    </div>
  );
};

export default PageContainer;
