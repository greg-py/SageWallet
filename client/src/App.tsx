import Container from "./components/layout/Container";
import LoadingSpinner from "./components/layout/LoadingSpinner";
import ProfileNavbar from "./components/layout/Navbar";
import Dashboard from "./components/pages/Dashboard";
import NotAuthenticated from "./components/pages/NotAuthenticated";

import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <ProfileNavbar />
      {isAuthenticated ? <Dashboard /> : <NotAuthenticated />}
    </Container>
  );
};

export default App;
