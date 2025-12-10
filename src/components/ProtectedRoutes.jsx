import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";
const ProtectedRoute = ({ children, redirectTo }) => {
  const { token, role } = useAuth();

  const isAuthenticated = Boolean(token);
  const isPermitted = role === "admin";
  if (!isAuthenticated) {
    return <Navigate to={"/"} replace />;
  } else if (!isPermitted) {
    return <Navigate to={"/noAccess"} />;
  }
  return children;
};

export default ProtectedRoute;
