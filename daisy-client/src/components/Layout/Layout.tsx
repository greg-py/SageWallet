import Navbar from "./Navbar";
import Drawer from "./Drawer";
import Footer from "./Footer";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Drawer>
      <Navbar />
      <main className="w-full flex-grow bg-base-200">{children}</main>
      <Footer />
    </Drawer>
  );
};

export default Layout;
