import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAMESPACE } from '../i18n';

const STORAGE_KEY = 'admin-language';

export const LANGUAGES = [
  { code: 'pt', flag: '\u{1F1E7}\u{1F1F7}' },
  { code: 'en', flag: '\u{1F1FA}\u{1F1F8}' },
] as const;

interface LanguageContextValue {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation(ADMIN_NAMESPACE);
  const [language, setLanguageState] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'pt'
  );

  const setLanguage = useCallback(
    (lang: string) => {
      setLanguageState(lang);
      i18n.changeLanguage(lang);
      localStorage.setItem(STORAGE_KEY, lang);
    },
    [i18n]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
