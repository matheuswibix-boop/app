import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./i18nTranslations";
const LanguageContext = createContext(null);
const SUPPORTED = ["pt","es","en"];
const getInitial = () => {
  if (typeof window === "undefined") return "pt";
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (SUPPORTED.includes(fromUrl)) return fromUrl;
    const saved = window.localStorage.getItem("insales-language");
    return SUPPORTED.includes(saved) ? saved : "pt";
  } catch { return "pt"; }
};
export function translate(source, lang) {
  if (lang === "pt" || typeof source !== "string") return source;
  const cleaned = source.trim();
  if (!cleaned) return source;
  const translated = translations[cleaned]?.[lang];
  if (!translated) return source;
  return source.replace(cleaned, translated);
}
export function LanguageProvider({children}) {
  const [lang, change] = useState(getInitial);
  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    change(next);
    try {
      window.localStorage.setItem("insales-language", next);
      const url = new URL(window.location.href);
      if (next === "pt") url.searchParams.delete("lang"); else url.searchParams.set("lang", next);
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    } catch { /* persistence unavailable */ }
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang === "en" ? "en-US" : lang;
  }, [lang]);
  const value = useMemo(() => ({lang, setLang, t: source => translate(source, lang)}), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider missing");
  return context;
}
export const T = ({children}) => {
  const {t} = useLanguage();
  return t(children);
};
