interface DrawerProps {
  children: JSX.Element | JSX.Element[];
}

const Drawer = ({ children }: DrawerProps) => {
  return (
    <div className="drawer">
      <input id="sagewallet-drawer" type="checkbox" className="drawer-toggle" />
      {children}
    </div>
  );
};

export default Drawer;
