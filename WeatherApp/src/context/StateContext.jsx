import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react-refresh/only-export-components
export const StateContext = React.createContext();

export const StateProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <StateContext.Provider
      value={{
        t,
        i18n,
        query,
        setQuery,
        weather,
        setWeather,
        error,
        setError,
        loading,
        setLoading,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
