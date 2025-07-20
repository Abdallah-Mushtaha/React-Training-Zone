// src/App.js
import { useState } from "react";
import LoginUI from "./Components/LoginUI";
import Profile from "./Components/Proile";

function App() {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  return (
    <div className="container mx-auto w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Authentication</h1>
      {isLogin ? <Profile /> : <LoginUI onlogin={() => setIsLogin(true)} />}
    </div>
  );
}

export default App;
