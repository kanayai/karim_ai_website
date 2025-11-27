import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationFR from './locales/fr/translation.json';
import translationIT from './locales/it/translation.json';
import translationPT from './locales/pt/translation.json';
import translationDE from './locales/de/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    es: {
        translation: translationES
    },
    fr: {
        translation: translationFR
    },
    it: {
        translation: translationIT
    },
    pt: {
        translation: translationPT
    },
    de: {
        translation: translationDE
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;
