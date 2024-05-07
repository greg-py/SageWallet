import AppContainer from "./AppContainer";
import Navbar from "./Navbar";
import AppContent from "./AppContent";
import Footer from "./Footer";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AppContainer>
      <Navbar />
      <AppContent>{children}</AppContent>
      <Footer />
    </AppContainer>
  );
};

export default Layout;
