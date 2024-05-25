import NavbarLinks from "./NavbarLinks";

const DrawerSide = () => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="sagewallet-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200">
        <NavbarLinks />
      </ul>
    </div>
  );
};

export default DrawerSide;
