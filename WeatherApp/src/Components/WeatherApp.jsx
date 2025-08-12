import { useEffect, useContext } from "react";

import "./i18n";
import { StateContext } from "../context/StateContext";
const API_KEY = "e79ca1b401f84bca8b8125519251208";

export default function WeatherApp() {
  const {
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
  } = useContext(StateContext);

  // Load saved language and theme from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("weatherLang") || "ar";
    i18n.changeLanguage(savedLang);

    const savedDark = localStorage.getItem("weatherDarkMode") === "true";
    setDarkMode(savedDark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n]);

  // Save dark mode setting to localStorage
  useEffect(() => {
    localStorage.setItem("weatherDarkMode", darkMode);
  }, [darkMode]);

  const fetchWeather = async () => {
    if (!query.trim()) {
      setError(t("errorInput"));
      setWeather(null);
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
          query
        )}&lang=${i18n.language}`
      );
      const data = await res.json();

      if (data.error) {
        setError(data.error.message || t("errorNotFound"));
        setLoading(false);
        return;
      }

      setWeather({
        location: `${data.location.name}, ${data.location.country}`,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        wind_kph: data.current.wind_kph,
        humidity: data.current.humidity,
      });
    } catch {
      setError(t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("weatherLang", newLang);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-5 transition-colors duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-blue-400 to-indigo-600 text-black"
      }`}
    >
      <div className="flex space-x-4 mb-5">
        <button
          onClick={toggleLanguage}
          className={`px-4 py-2 rounded font-semibold transition ${
            darkMode
              ? "bg-yellow-400 hover:bg-yellow-500 text-black"
              : "bg-yellow-400 hover:bg-yellow-500"
          }`}
          aria-label="Toggle language"
        >
          {t("toggleLang")}
        </button>

        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded font-semibold transition ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md flex mb-10 shadow-lg rounded overflow-hidden transition-colors duration-500 ${
          darkMode
            ? "bg-gray-800 bg-opacity-70"
            : "bg-white bg-opacity-30 backdrop-blur-md"
        }`}
      >
        <input
          type="text"
          placeholder={t("placeholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`flex-grow p-3 text-lg outline-none
    ${darkMode ? "placeholder-gray-400" : "placeholder-gray-700"}`}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          aria-label={t("placeholder")}
          style={{
            backgroundColor: darkMode ? "#2d2d2d" : "transparent",
            color: darkMode ? "white" : "inherit",
          }}
        />

        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 px-5 font-semibold transition"
          aria-label={t("search")}
        >
          {t("search")}
        </button>
      </form>

      <div
        className={`rounded-xl p-8 max-w-md w-full text-center shadow-lg min-h-[320px] flex flex-col justify-center items-center transition-colors duration-500 ${
          darkMode
            ? "bg-gray-800 bg-opacity-70 text-white"
            : "bg-white bg-opacity-30 backdrop-blur-md text-black"
        }`}
        role="region"
        aria-live="polite"
      >
        {loading && (
          <p className="animate-pulse font-semibold">{t("loading")}</p>
        )}

        {!loading && error && (
          <p className="text-red-600 font-semibold">{error}</p>
        )}

        {!loading && weather && (
          <>
            <h2 className="text-3xl font-bold mb-2">{weather.location}</h2>
            <img
              src={weather.icon}
              alt={weather.condition}
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <p className="text-2xl mb-2">{weather.condition}</p>
            <p className="text-3xl font-extrabold mb-2">
              {Math.round(weather.temp)}°C
            </p>
            <p>
              {t("wind")}: {weather.wind_kph}{" "}
              {i18n.language === "ar" ? "كم/س" : "kph"}
            </p>
            <p>
              {t("humidity")}: {weather.humidity}%
            </p>
          </>
        )}

        {!loading && !weather && !error && (
          <p className="opacity-70">{t("noData")}</p>
        )}
      </div>
    </div>
  );
}
