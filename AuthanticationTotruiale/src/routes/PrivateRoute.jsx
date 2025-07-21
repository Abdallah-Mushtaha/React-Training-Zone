import { Navigate } from "react-router";
import AuthContext, { AuthProvider } from "../Contexts/AuthContext";
import { useContext } from "react";

//  This  Component will Protect the Route save the user from Unauthorized Access
const PrivateRoute = ({ children, allowedRoles }) => {
  const useAuth = useContext(AuthContext);
  if (!useAuth?.Auth) return <Navigate to="/login" />;
  //   if the user actually login but not autherized then he will be redirected to the not autherized page
  if (!allowedRoles.includes(useAuth.Auth.role))
    return <Navigate to="/not-authorized" />;

  return children; // if the user is authenticated and has the required role, render the protected route
};

export default PrivateRoute;
