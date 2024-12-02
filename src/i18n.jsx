import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: localStorage.getItem("i18nextLng") || "uz",
    lng: localStorage.getItem("i18nextLng") || "uz",
    supportedLngs: ["en", "ru", "uz"],
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

export default i18n;
