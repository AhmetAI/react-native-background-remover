import React from "react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, tr } from "./translations";


const resources = {
    en: {
        translation: en,
    },
    tr: {
        translation: tr,
    }
}


i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: "en",
    compatibilityJSON: "v3",
    resources,
}) 

export default i18next;