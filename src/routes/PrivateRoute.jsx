import useAuth from "../features/auth/useAuth";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/sign-in"}></Navigate>;
};

export default PrivateRoute;
