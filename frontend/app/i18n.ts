import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import en from "../translation/en.json";
import ro from "../translation/ro.json";

// Define your resources
const resources = {
  en: { translation: en },
  ro: { translation: ro },
} as const;

// Define your resources

const LANGUAGE_KEY = "recipe-language";
export const initI18n = async () => {
  // Try loading saved language from AsyncStorage
  const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLang || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

  // Save language when changed
  i18n.on("languageChanged", async (lng) => {
    await AsyncStorage.setItem(LANGUAGE_KEY, lng);
  });

  return i18n;
};

export default i18n;
