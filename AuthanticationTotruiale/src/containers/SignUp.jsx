import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { fakeRegister } from "../routes/fakeApi";
import AuthContext from "../Contexts/AuthContext";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigator = useNavigate();

  const handelSignUp = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const data = await fakeRegister({ username, password });
      login(data);
      navigator("/User");
    } catch (error) {
      setError(error?.message || error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-blue-400 ">Sign Up</h1>
      <form
        onSubmit={handelSignUp}
        className="flex flex-col gap-3 mt-1 w-100 mt-5"
      >
        <input
          className="bg-gray-200 p-5 w-100 rounded-md outline-none"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="bg-gray-200 p-5 w-100 rounded-md outline-none"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="
        bg-gray-400 p-5 w-100 rounded-md outline-none
        "
        >
          Sign Up
        </button>
      </form>
      {error && <p className="error text-red ">{error}</p>}
    </div>
  );
}
