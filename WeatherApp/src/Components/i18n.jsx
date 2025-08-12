import enTranslation from "../locales/en/translation.json";
import arTranslation from "../locales/ar/translation.json";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";

i18next.use(initReactI18next).init({
  lng: localStorage.getItem("weatherLang") || "ar",
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
  },
});
