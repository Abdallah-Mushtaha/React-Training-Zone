import React, { useContext, useState } from "react";
import fakeApi from "../routes/fakeApi";
import AuthContext, { AuthProvider } from "../Contexts/AuthContext";
import { Link, Links, useNavigate } from "react-router";

export default function Login() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [Forget, setForget] = useState("");

  const { login } = useContext(AuthContext);
  const navigator = useNavigate();

  const handelSubmit = async (event) => {
    event.preventDefault();
    // check if user name and password is empty first
    if (Username === "" || password === "") {
      setError("Please enter user name and password");
      return;
    }
    setError(null);
    setForget(null);
    try {
      const data = await fakeApi({ username: Username, password: password });
      if (!data) {
        return (
          setError("Invalid username or password") &&
          setForget("Dont have an account ?")
        );
      }
      login(data);
      console.log("Successfully logged in");

      //   if user is admin will redirect to admin page otherwise will redirect to user page

      navigator(data.role === "admin" ? "/Admin" : "/User");
    } catch (error) {
      setError(error?.message || error);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black">
      <h2 className="text-3xl font-bold text-blue-400 mb-6">Login</h2>
      <form onSubmit={handelSubmit}>
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold text-gray-400 pt-3">Name : </h4>
          <input
            className="bg-gray-200 p-5 w-100 rounded-md outline-none"
            type="text"
            placeholder="Enter User Name"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <h4 className="text-lg font-bold text-gray-400 pt-3">Password :</h4>
          <input
            className="bg-gray-200 p-5 w-100 rounded-md outline-none"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Link
            to="/SignUp"
            className="text-gray-600 transition-all text-xs flex justify-end hover:text-gray-400 py-2 w-auto"
          >
            Dont have an account ?
          </Link>
          <button
            type="submit"
            className="bg-blue-200 hover:bg-blue-300  p-3 w-50 rounded-2xl"
          >
            Login
          </button>
          {error && (
            <p className="text-red-500 transition-all text-xs">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
}
