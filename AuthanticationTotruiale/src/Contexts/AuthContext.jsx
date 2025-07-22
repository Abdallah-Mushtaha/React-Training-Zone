import { createContext, useEffect, useState } from "react";

//   context to store the user data  like there token and ther role
const AuthContext = createContext();

//  create provider and {children} its a special props that can access to any value of this { state, dispatch, DeletUSer }
export const AuthProvider = ({ children }) => {
  // stoer the user state at the first time use site will be null mean not authenticated
  const [Auth, setAuth] = useState(() => {
    const storAuth = localStorage.getItem("auth");
    return storAuth ? JSON.parse(storAuth) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storAuth = localStorage.getItem("auth");
    if (storAuth) {
      setAuth(JSON.parse(storAuth));
    }
    setLoading(false);
  }, []);

  //   if user login will set the user data and if user logout will set the user data to null
  const login = (data) => {
    if (data) {
      setAuth(data);
      localStorage.setItem("auth", JSON.stringify(data)); // store the user data in the local storage
    } else {
      setAuth(null);
      localStorage.removeItem("auth"); // remove the user data from the local storage
    }
  };
  const logout = () => setAuth(null);

  return (
    <AuthContext.Provider value={{ Auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
