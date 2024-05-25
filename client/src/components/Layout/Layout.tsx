import Drawer from "./Drawer";
import Navbar from "./Navbar";
import Main from "./Main";
import DrawerSide from "./DrawerSide";
import Footer from "./Footer";
import DrawerContent from "./DrawerContent";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  filterMonth: number;
  setFilterMonth: React.Dispatch<React.SetStateAction<number>>;
  filterYear: number;
  setFilterYear: React.Dispatch<React.SetStateAction<number>>;
}

const Layout = ({
  children,
  filterMonth,
  setFilterMonth,
  filterYear,
  setFilterYear,
}: LayoutProps) => {
  return (
    <Drawer>
      <DrawerContent>
        <Navbar
          filterMonth={filterMonth}
          setFilterMonth={setFilterMonth}
          filterYear={filterYear}
          setFilterYear={setFilterYear}
        />
        <Main>{children}</Main>
        <Footer />
      </DrawerContent>
      <DrawerSide />
    </Drawer>
  );
};

export default Layout;
