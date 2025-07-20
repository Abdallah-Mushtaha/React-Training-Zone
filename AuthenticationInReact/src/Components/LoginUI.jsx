import React, { useState } from "react";
import api from "../api";

export default function LoginUI({ onlogin }) {
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");

  const handelLogin = async (event) => {
    event.preventDefault();

    try {
      const { data } = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      console.log("Login successful");
      onlogin();
    } catch (error) {
      console.log("Failed to login", error);
    }
  };

  return (
    <div className="flex flex-col gap-3 ">
      <div className="text-lg font-bold text-gray-400 pt-3">Login</div>
      <form onSubmit={handelLogin} className="flex flex-col gap-3 mt-1 w-100">
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-200 p-5 w-100 rounded-md outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password "
          className="bg-gray-200 p-5 w-100 rounded-md outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-400 p-5 w-100 rounded-md text-white/80 font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
