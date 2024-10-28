// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import LocalStorageBackend from "i18next-localstorage-backend";

// Import translations
import translationEN from "./en/translation.json";
import translationAr from "./ar/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAr,
  },
};

i18n
  .use(Backend)
  .use(LocalStorageBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") ||"ar",
    fallbackLng: "ar",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "./{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
