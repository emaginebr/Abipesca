import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage, LANGUAGES } from '../contexts/LanguageContext';
import { ADMIN_NAMESPACE } from '../i18n';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation(ADMIN_NAMESPACE);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const languageLabels: Record<string, string> = {
    pt: t('language.portuguese'),
    en: t('language.english'),
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-brand-navy/80 hover:text-brand-blue rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang.flag}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors ${
                language === lang.code
                  ? 'text-brand-blue bg-brand-blue/5 font-medium'
                  : 'text-brand-navy/80 hover:bg-brand-blue/5 hover:text-brand-blue'
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{languageLabels[lang.code]}</span>
              {language === lang.code && (
                <Check className="w-4 h-4 ml-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
