import { Navigate } from "react-router";
import AuthContext, { AuthProvider } from "../Contexts/AuthContext";
import { useContext } from "react";

//  This  Component will Protect the Route save the user from Unauthorized Access
const PrivateRoute = ({ children, allowedRoles }) => {
  const { Auth, loading } = useContext(AuthContext);
  const InternalNavegation = sessionStorage.getItem("InternalNavegation");

  if (loading)
    return (
      <div className="text-center w-screen h-screen flex flex-col justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-gray-400 mx-auto"></div>
      </div>
    );

  if (!Auth || !InternalNavegation) return <Navigate to="/login" />;

  //   if the user actually login but not autherized then he will be redirected to the not autherized page
  if (!allowedRoles.includes(Auth.role))
    return <Navigate to="/not-authorized" />;

  return children; // if the user is authenticated and has the required role, render the protected route
};

export default PrivateRoute;
