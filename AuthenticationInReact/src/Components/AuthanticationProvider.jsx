// In this page we will just handle the Authentication
import React, { createContext, useState, useContext } from "react";
import { login } from "../Auth";

// the Auth Function in Auth.js will return the authToken so may be we need to store in state or local storage in the AuthContext
/*   the reason why need optional because maybe we need 3 different states 
    - the state Null that mean we don't have user checked and the user is not authenticated
    - the state User that mean we have user checked and the user is authenticated will be stored in the state 
    - the state String that mean undefined it not checked yet and we don't know if the user is authenticated or not

    - then we need 2 functions one for login user and one for logout user 
      this function will not have a parameter because the function in Auth.js will not pass any parameter
*/

// create Context
const AuthContext = createContext();

// now we can do component to access the context
// to have access to the context we need to use the useContext hook

export function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(undefined); // the default value will be undefined because we don't know if the user is authenticated or not
  const [currentUser, setCurrentUser] = useState(undefined);

  const handleLogin = async () => {
    try {
      const res = await login();
      const authToken = res?.[1]?.authToken;
      const user = res?.[1]?.user;

      setAuthToken(authToken);
      setCurrentUser(user);
    } catch (error) {
      setAuthToken(null);
      setCurrentUser(null);
    }
  };

  const handleLogout = async () => {
    setAuthToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ authToken, currentUser, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// By this function we can access to the context and act with the Role
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
}

// This Component will be Able to handle the Authentication
// calling the backend with the correct role "user" then
// providing the Authenticated user to the Rest of the Application
// For this we will use AuthContext API in React
export default function AuthenticationProvider() {
  return <div>AuthenticationProvider</div>;
}
