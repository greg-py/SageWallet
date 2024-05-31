import Drawer from "./Drawer";
import Navbar from "./Navbar";
import Main from "./Main";
import DrawerSide from "./DrawerSide";
import Footer from "./Footer";
import DrawerContent from "./DrawerContent";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Drawer>
      <DrawerContent>
        <Navbar />
        <Main>{children}</Main>
        <Footer />
      </DrawerContent>
      <DrawerSide />
    </Drawer>
  );
};

export default Layout;
