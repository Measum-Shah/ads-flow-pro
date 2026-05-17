import { Navigate, Outlet } from "react-router-dom";
import AppLoader from "../components/loaders/AppLoader";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { authLoading, isAuthenticated } = useAuth();

  if (authLoading) {
    return <AppLoader text="Checking your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;