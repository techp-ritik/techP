import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import eng from "./i18.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: eng,
      },
      fr: {
        translation: {
          fre: "French",
        },
      },
    },
    lng: document.querySelector("html")?.lang, // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    detection: {
      order: [
        "htmlTag",
        "cookie",
        "localStorage",
        "sessionStorage",
        "path",
        "subdomain",
      ],
    },
  });
export default i18next;
