import React, { useState, type FormEvent } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router";
import * as CryptoJS from "crypto-js";
import { useSelector } from "react-redux";

const social = [
  { name: "Face", path: "./images/facebook.png" },
  { name: "Google", path: "./images/google.png" },
  { name: "x", path: "./images/twitter.png" },
];

const fields = [
  {
    icon: <IoMdPerson />,
    type: "text",
    placeholder: "Enter username Or Email",
  },
  { icon: <FaLock />, type: "password", placeholder: "Enter Password" },
];

export default function Login() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Data = useSelector((state: any) => state.user.users);
  const [primaryInput, setprimaryInput] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setalert] = useState("");
  const [agree, setAgree] = useState(false);
  const hashedInputPassword = CryptoJS.SHA256(password).toString();

  const navigation = useNavigate();

  const showAlert = (message: string) => {
    setalert(message);

    setTimeout(() => {
      setalert("");
    }, 3000);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agree) {
      showAlert("You must agree to the terms");
      return;
    }
    if (!primaryInput || !password) {
      showAlert("Please fill all fields");
      return;
    }

    const user = Data.find(
      (user: { Username: string; Email: string; hashedPassword: string }) =>
        (user.Username === primaryInput || user.Email === primaryInput) &&
        user.hashedPassword === hashedInputPassword
    );

    // console.log(user);

    if (!user) {
      showAlert("Username or password is incorrect");
      return;
    } else {
      localStorage.setItem("CurrentUser", JSON.stringify(user));
      navigation("/Home");
    }
  };

  return (
    <section className="   login-section  py-5">
      <div className="container flex justify-center items-center flex-col md:flex-row px-5 md:px-0 ">
        <div className="form flex flex-col items-center md:items-start w-full md:w-1/2 max-w-md">
          <h1 className="text-black font-bold text-3xl">Sign In</h1>
          <form onSubmit={handleSubmit} className="mt-10 w-full">
            {fields.map((field, index) => (
              <div
                key={index}
                className="field flex items-center gap-3 rounded-md border-2 w-full p-3 border-black mt-5"
              >
                {field.icon}
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.type === "text" ? primaryInput : password}
                  onChange={(e) =>
                    field.type === "text"
                      ? setprimaryInput(e.target.value)
                      : setpassword(e.target.value)
                  }
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  className="outline-0 w-full"
                />
              </div>
            ))}
            {alert && (
              <p className="text-red-500 flex justify-end mt-1 text-sm ease-in translate-middle">
                {alert}
              </p>
            )}

            <label className="flex items-center mt-5 gap-3 w-full pt-1">
              <input
                type="checkbox"
                name="RememberMe"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              Remember Me
            </label>

            <button className="bg-red-500 hover:bg-red-600 cursor-pointer p-3 flex items-center justify-center text-white rounded-2xl w-full md:w-40 mt-5">
              Login
            </button>
          </form>

          <div className="ourLogin flex gap-3 mt-16 items-center">
            Or, Login with
            {social.map((img) => (
              <img
                key={img.name}
                src={img.path}
                className="w-9 h-8 object-contain cursor-pointer"
                alt={img.name}
              />
            ))}
          </div>

          <p className="mt-2">
            Don’t have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigation("/SignUp")}
            >
              Create One
            </span>
          </p>
        </div>

        <div className="img w-full md:w-1/2 lg:flex justify-end md:justify-end mt-10 md:mt-0 hidden">
          <img
            src="./images/SignIn.svg"
            className="w-full max-w-xl object-contain"
            alt="SignIn"
          />
        </div>
      </div>
    </section>
  );
}
