import useAuth from "../features/auth/useAuth";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user) {
    return children;
  }
  return (
    <Navigate
      to={"/sign-in"}
      state={location?.pathname}
      replace={true}
    ></Navigate>
  );
};

export default PrivateRoute;
