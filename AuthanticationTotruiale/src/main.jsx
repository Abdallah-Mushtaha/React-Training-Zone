import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NotAuthorized from "./containers/NotAuthorized.jsx";
import Admin from "./containers/Admin.jsx";

import Login from "./containers/Login.jsx";

import User from "./containers/User.jsx";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import SignUp from "./containers/SignUp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/user"
            element={
              <PrivateRoute allowedRoles={["user"]}>
                <User />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
