// src/App.js
import React, { useState, useEffect } from "react";
import { useAuth } from "./Components/AuthanticationProvider";
import Profiler from "./Components/Proile";
import LoginUI from "./Components/LoginUI";
import { Link } from "react-router";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const { authToken, currentUser, handleLogin, handleLogout } = useAuth();

  useEffect(() => {
    setIsLogin(!!authToken);
  }, [authToken]);

  return (
    <div className="container mx-auto w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Authentication</h1>
      <Link to="/Protected"> Protected</Link>
      {isLogin ? <Profiler /> : <LoginUI onlogin={() => setIsLogin(true)} />}
      <hr />
      <hr />
      <hr />
      <hr />
      {authToken ? (
        <button
          onClick={handleLogout}
          className="bg-amber-200 my-7 p-3 w-50 rounded-2xl"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-amber-200 my-7 p-3 w-50 rounded-2xl"
        >
          Login
        </button>
      )}
    </div>
  );
}

export default App;
