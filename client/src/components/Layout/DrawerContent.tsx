interface DrawerContentProps {
  children: JSX.Element | JSX.Element[];
}

const DrawerContent = ({ children }: DrawerContentProps) => {
  return (
    <div className="drawer-content flex flex-col justify-between min-h-screen bg-base-200">
      {children}
    </div>
  );
};

export default DrawerContent;
