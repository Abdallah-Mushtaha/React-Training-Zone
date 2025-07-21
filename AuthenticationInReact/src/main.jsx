// We use react-router-dom because we need to implement this app
// as part of specific routes that want to protect and only allow
// signed-in users with the correct role to access that route
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import App from "./App";
import { AuthContextProvider } from "./Components/AuthanticationProvider";
import ProtectedRoute from "./Components/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/protected",
    element: (
      <ProtectedRoute allowedRoles={["admin", "user"]}>
        <p> Protected</p>
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
