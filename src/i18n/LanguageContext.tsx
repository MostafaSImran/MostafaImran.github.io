import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Content, Language } from './types';
import { en } from './locales/en';
import { bn } from './locales/bn';
import { id } from './locales/id';
import { languageMeta } from './types';

const locales: Record<Language, Content> = { en, bn, id };

const STORAGE_KEY = 'site-language';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'bn' || stored === 'id') return stored;
  return 'en';
};

interface LanguageContextValue {
  lang: Language;
  content: Content;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  content: en,
  setLang: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable — ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = languageMeta[lang].htmlLang;
    document.title =
      lang === 'bn'
        ? 'মোস্তফা শওকত ইমরান — পোর্টফোলিও'
        : lang === 'id'
          ? 'Mostafa Shawkat Imran — Portofolio'
          : 'Mostafa Shawkat Imran — Portfolio';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, content: locales[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useContent = () => useContext(LanguageContext);

export default LanguageContext;
