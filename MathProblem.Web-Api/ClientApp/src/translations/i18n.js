import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import {translation_ru} from "./ru/ru.js";
import {translation_en} from "./en/en.js";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: translation_en
            },
            ru: {
                translation: translation_ru
            }
        }
    });

i18n.changeLanguage("ru");