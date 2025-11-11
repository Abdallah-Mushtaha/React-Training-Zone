import React, { useReducer, type FormEvent, type JSX } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import * as CryptoJS from "crypto-js";
import { addUser } from "../../src/userSlice";
import { useDispatch } from "react-redux";
import { WiMoonFirstQuarter } from "react-icons/wi";
import { WiMoonAltFirstQuarter } from "react-icons/wi";

const fields: {
  name: keyof FormState;
  icon: JSX.Element;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "Fname",
    icon: <WiMoonAltFirstQuarter />,
    type: "text",
    placeholder: "Enter First Name",
  },
  {
    name: "Secname",
    icon: <WiMoonFirstQuarter />,
    type: "text",
    placeholder: "Enter Last Name",
  },
  {
    name: "Username",
    icon: <IoMdPerson />,
    type: "text",
    placeholder: "Enter Username",
  },
  {
    name: "Email",
    icon: <MdOutlineMail />,
    type: "email",
    placeholder: "Enter Email",
  },
  {
    name: "password",
    icon: <FaLock />,
    type: "password",
    placeholder: "Enter Password",
  },
  {
    name: "ConfigPassword",
    icon: <IoLockClosedOutline />,
    type: "password",
    placeholder: "Confirm Password",
  },
];

interface FormState {
  id: number;
  Fname: string;
  Secname: string;
  Email: string;
  Username: string;
  password: string;
  ConfigPassword: string;
  alert: string;
  agree: boolean;
}

export const ActionType = {
  SET_FIELD: "SET_FIELD",
  SET_ALERT: "SET_ALERT",
  RESET: "RESET",
} as const;

type ActionType = (typeof ActionType)[keyof typeof ActionType];

type Action =
  | {
      type: typeof ActionType.SET_FIELD;
      field: keyof FormState;
      value: string | boolean;
    }
  | { type: typeof ActionType.SET_ALERT; value: string }
  | { type: typeof ActionType.RESET };

const initialState: FormState = {
  id: Math.floor(Math.random() * 1000000),
  Fname: "",
  Secname: "",
  Email: "",
  Username: "",
  password: "",
  ConfigPassword: "",
  alert: "",
  agree: false,
};
const reducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ALERT":
      return { ...state, alert: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default function SignUp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchRedux = useDispatch();

  const navigation = useNavigate();

  const showAlert = (message: string) => {
    dispatch({ type: ActionType.SET_ALERT, value: message });
    setTimeout(() => dispatch({ type: ActionType.SET_ALERT, value: "" }), 3000);
  };
  const ResetFiald = () => {
    dispatch({ type: ActionType.RESET });
  };

  // Hanfel the Form

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!state.agree) {
      showAlert("You must agree to the terms");
      return;
    }

    if (
      !state.Fname ||
      !state.Secname ||
      !state.Email ||
      !state.Username ||
      !state.password ||
      !state.ConfigPassword
    ) {
      showAlert("Please fill all fields");
      return;
    }

    if (state.password !== state.ConfigPassword) {
      showAlert("Passwords do not match");
      return;
    }
    const hashedPassword = CryptoJS.SHA256(state.password).toString();

    dispatchRedux(
      addUser({
        id: Math.random(),
        Fname: state.Fname,
        Secname: state.Secname,
        Email: state.Email,
        Username: state.Username,
        hashedPassword: hashedPassword,
      })
    );

    ResetFiald();
    navigation("/Login");
  };

  return (
    <section className="   login-section  py-5">
      <div className="container flex justify-around items-center flex-col md:flex-row px-5 md:px-0 ">
        <div className="img w-90 hidden lg:flex mt-10 md:mt-0">
          <img
            src="./images/SignUp.png"
            className="w-100  object-contain"
            alt="SignIn"
          />
        </div>
        <div className="form flex flex-col items-start md:items-start w-full md:w-1/2 max-w-md">
          <h1 className="text-black font-bold text-3xl">Sign Up</h1>
          <form onSubmit={handleSubmit} className="mt-10 w-full">
            {fields.map((field, index) => (
              <div
                key={index}
                className="field flex items-center gap-3 rounded-md border-2 w-full p-3 border-black mt-5"
              >
                <span>{field.icon}</span>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="outline-0 w-full"
                  value={state[field.name as keyof FormState] as string}
                  onChange={(e) =>
                    dispatch({
                      type: ActionType.SET_FIELD,
                      field: field.name,
                      value: e.target.value,
                    })
                  }
                />
              </div>
            ))}

            {state.alert && (
              <p className="text-red-500 flex justify-end mt-1 text-sm ease-in translate-middle">
                {state.alert}
              </p>
            )}

            <label className="flex items-center mt-5 gap-3 w-full pt-1">
              <input
                type="checkbox"
                name="RememberMe"
                checked={state.agree}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                onChange={(e) => {
                  dispatch({
                    type: ActionType.SET_FIELD,
                    field: "agree",
                    value: e.target.checked,
                  });
                }}
              />
              I agree to all terms
            </label>

            <button className="bg-red-500 hover:bg-red-600 cursor-pointer p-3 flex items-center justify-center text-white rounded-2xl w-full md:w-40 mt-5">
              Register
            </button>
          </form>

          <p className="mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigation("/Login")}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
