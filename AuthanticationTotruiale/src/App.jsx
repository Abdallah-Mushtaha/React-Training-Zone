import { useEffect } from "react";
import Login from "./containers/Login";
import { useLocation } from "react-router";

function App() {
  const path = useLocation();
  useEffect(() => {
    if (sessionStorage.getItem("InternalNavigation")) {
      sessionStorage.setItem("InternalNavigation", "true");
    }
  }, [path]);
  return (
    <>
      <Login />
    </>
  );
}

export default App;
