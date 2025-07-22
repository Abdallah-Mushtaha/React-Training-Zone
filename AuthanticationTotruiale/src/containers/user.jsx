import React, { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import { useNavigate } from "react-router";

export default function user() {
  const { logout } = useContext(AuthContext);
  const path = useNavigate();
  const logoutBTN = () => {
    logout();
    path("/login");
  };
  return (
    <div className="text-3xl bg-green-400 text-white w-screen h-screen flex flex-col justify-center items-center">
      user
      <button
        className="bg-red-200 my-7 p-8 w-50 rounded-2xl hover:bg-red-300  transition-all"
        onClick={logoutBTN}
      >
        logout
      </button>
    </div>
  );
}
