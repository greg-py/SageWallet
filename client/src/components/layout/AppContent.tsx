interface AppContentProps {
  children: JSX.Element | JSX.Element[];
}

const AppContent = ({ children }: AppContentProps) => {
  return <main className="w-full flex-grow bg-base-200">{children}</main>;
};

export default AppContent;
