import AppContainer from "./AppContainer";
import Navbar from "./Navbar";
import AppContent from "./AppContent";
import Footer from "./Footer";
import { FilterOptions } from "../../models/filters";

interface LayoutProps {
  filterMonth: number;
  setFilterMonth: React.Dispatch<React.SetStateAction<number>>;
  filterYear: number;
  setFilterYear: React.Dispatch<React.SetStateAction<number>>;
  filterOptions: FilterOptions;
  children: JSX.Element | JSX.Element[];
}

const Layout = ({
  filterMonth,
  setFilterMonth,
  filterYear,
  setFilterYear,
  filterOptions,
  children,
}: LayoutProps) => {
  return (
    <AppContainer>
      <Navbar
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        filterOptions={filterOptions}
      />
      <AppContent>{children}</AppContent>
      <Footer />
    </AppContainer>
  );
};

export default Layout;
