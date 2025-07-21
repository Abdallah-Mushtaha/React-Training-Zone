// ProtectedRoute.jsx
import React from "react";
import { useAuth } from "./AuthanticationProvider";
export default function ProtectedRoute({ allowedRoles, children }) {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }

  //   If the user is not authenticated or does not have the required role to access the protected route, render a "Not Authorized" message
  if (
    currentUser === null ||
    (allowedRoles && !allowedRoles.includes(currentUser.role))
  ) {
    return <div>Not Authorized</div>;
  }

  return <>{children}</>;
}
