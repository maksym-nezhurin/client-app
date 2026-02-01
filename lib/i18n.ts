import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Supported languages
export type SupportedLanguage = 'en' | 'uk' | 'pl';

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'uk', 'pl'];

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  uk: 'Українська',
  pl: 'Polski',
};

// Translation namespaces
export const NAMESPACES = [
  'common',
  'auth',
  'profile',
  'menu',
  'users',
  'cars',
  'scrapper',
  'api',
  'time',
  'errors',
  'client',
  'system',
] as const;

export type TranslationNamespace = typeof NAMESPACES[number];

// Initialize i18next
i18n
  .use(HttpBackend) // Load translations from public/locales
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES,
    defaultNS: 'common',
    ns: NAMESPACES,
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
    },
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    react: {
      useSuspense: false,
    },
  });

// Type-safe translation hook
export function useTypedTranslation(ns?: TranslationNamespace | TranslationNamespace[]) {
  return useTranslation(ns || 'common');
}

// Type-safe translation keys (basic type support)
export type TranslationKey = string;

export interface TranslationOptions {
  [key: string]: string | number | boolean;
}

export default i18n;
