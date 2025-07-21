import { createContext, useState } from "react";

//   context to store the user data  like there token and ther role
const AuthContext = createContext();

//  create provider and {children} its a special props that can access to any value of this { state, dispatch, DeletUSer }
export const AuthProvider = ({ children }) => {
  // stoer the user state at the first time use site will be null mean not authenticated
  const [Auth, setAuth] = useState(null);
  //   if user login will set the user data and if user logout will set the user data to null
  const login = (data) => {
    if (data) setAuth(data);
    else {
      setAuth(null);
    }
  };
  const logout = () => setAuth(null);

  return (
    <AuthContext.Provider value={{ Auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
