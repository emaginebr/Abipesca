import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import pt from './locales/pt';

export const ADMIN_NAMESPACE = 'admin';
const STORAGE_KEY = 'admin-language';

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  resources: {
    en: { [ADMIN_NAMESPACE]: en },
    pt: { [ADMIN_NAMESPACE]: pt },
  },
  lng: localStorage.getItem(STORAGE_KEY) || 'pt',
  fallbackLng: 'pt',
  defaultNS: ADMIN_NAMESPACE,
  ns: [ADMIN_NAMESPACE],
  interpolation: {
    escapeValue: false,
  },
  initImmediate: false,
});

export default i18n;
