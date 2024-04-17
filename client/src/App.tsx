import Container from "./components/layout/Container";
import ProfileNavbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/auth/LoginButton";
import LoadingOverlay from "./components/layout/LoadingOverlay";

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!user || !isAuthenticated) {
    return (
      <Container>
        <div className="flex justify-center items-center h-screen w-full">
          <LoginButton />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <ProfileNavbar />
      <Dashboard />
    </Container>
  );
};

export default App;
