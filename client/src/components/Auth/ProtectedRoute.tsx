import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "../Layout/LoadingSpinner";

interface ProtectedRouteProps {
  children: JSX.Element | JSX.Element[];
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    loginWithRedirect({ appState: { returnTo: location.pathname } });
    return <LoadingSpinner />;
  }

  return children;
};

export default ProtectedRoute;
