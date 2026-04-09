import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import t, { type Lang } from '../i18n/translations';

interface LanguageContextType {
  lang:    Lang;
  setLang: (l: Lang) => void;
  tr:      typeof t['en'];          // strongly-typed strings for active lang
}

const LanguageContext = createContext<LanguageContextType>({
  lang:    'en',
  setLang: () => {},
  tr:      t.en,
});

/* ── Detect initial language from URL path (/ru, /uz) ───────────────────── */
function detectLang(): Lang {
  const stored = localStorage.getItem('bikon_lang') as Lang | null;
  if (stored && ['en','ru','uz'].includes(stored)) return stored;
  const seg = window.location.pathname.split('/')[1];
  if (seg === 'ru' || seg === 'uz') return seg;
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('bikon_lang', l);
    /* ── Update URL without full reload ─────────────────────────── */
    const newPath = l === 'en' ? '/' : `/${l}`;
    window.history.pushState({}, '', newPath);
  };

  /* Keep in sync on browser back/forward */
  useEffect(() => {
    const onPop = () => setLangState(detectLang());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
