import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Layout/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouteProps {
  children: JSX.Element | JSX.Element[];
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
