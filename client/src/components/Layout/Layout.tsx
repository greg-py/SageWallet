import AppContainer from "./AppContainer";
import Navbar from "./Navbar";
import AppContent from "./AppContent";
import Footer from "./Footer";

interface LayoutProps {
  filterMonth: number;
  setFilterMonth: React.Dispatch<React.SetStateAction<number>>;
  filterYear: number;
  setFilterYear: React.Dispatch<React.SetStateAction<number>>;
  children: JSX.Element | JSX.Element[];
}

const Layout = ({
  filterMonth,
  setFilterMonth,
  filterYear,
  setFilterYear,
  children,
}: LayoutProps) => {
  return (
    <AppContainer>
      <Navbar
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
      />
      <AppContent>{children}</AppContent>
      <Footer />
    </AppContainer>
  );
};

export default Layout;
