import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { T, useLanguage } from "@/lib/i18n";
import { Logo } from "./Logo";
import { NAV } from "@/lib/content";

const LANGUAGE_OPTIONS = [
  { code: "pt", flag: "🇧🇷", label: "Português" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "en", flag: "🇬🇧", label: "English" }
];

const LanguageSelector = () => {
  const {lang,setLang} = useLanguage();
  const [expanded,setExpanded] = useState(false);
  const root = useRef(null);
  useEffect(() => {
    if (!expanded) return undefined;
    const closeOutside = (e) => { if (!root.current?.contains(e.target)) setExpanded(false); };
    const closeEscape = (e) => { if (e.key === "Escape") setExpanded(false); };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, [expanded]);
  const active = LANGUAGE_OPTIONS.find(option => option.code === lang) || LANGUAGE_OPTIONS[0];
  return (
    <div className="relative shrink-0" ref={root} data-testid="language-switcher">
      <button type="button" onClick={() => setExpanded(v => !v)} aria-expanded={expanded} aria-haspopup="true"
        aria-label="Selecionar idioma / Select language / Elegir idioma"
        data-testid="language-switcher-trigger"
        className="flex h-10 items-center gap-1.5 rounded-full border border-white/20 bg-[#111316]/80 px-2.5 text-xs font-bold text-white transition-colors hover:border-[#FFC400]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFC400]">
        <span aria-hidden="true" className="text-lg leading-none">{active.flag}</span><span>{lang.toUpperCase()}</span>
        <ChevronDown className={`h-3 w-3 text-[#FFC400] transition-transform ${expanded ? "rotate-180" : ""}`}/>
      </button>
      {expanded && <div role="group" aria-label="Site language" className="absolute right-0 top-full z-[80] mt-2 min-w-[176px] overflow-hidden rounded-2xl border border-[#FFC400]/25 bg-[#101114] p-1.5 shadow-2xl">
        {LANGUAGE_OPTIONS.map(option => <button key={option.code} type="button" lang={option.code==="pt"?"pt-BR":option.code}
          aria-pressed={lang===option.code} onClick={()=>{setLang(option.code);setExpanded(false);}}
          data-testid={`language-option-${option.code}`}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/10 ${lang===option.code?"bg-[#FFC400]/10 text-[#FFC400]":"text-white"}`}>
          <span aria-hidden="true" className="text-xl leading-none">{option.flag}</span><span>{option.label}</span>
        </button>)}
      </div>}
    </div>
  );
};

export const Nav = () => {
  const {t} = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);

  const navCls = ({ isActive }) => `group relative text-sm font-semibold transition-colors ${isActive ? "text-[#FFC400]" : "text-[#d5d7db] hover:text-white"}`;

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
        scrolled || open ? "bg-[#070809]/80 backdrop-blur-xl border-white/10" : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link to="/" data-testid="nav-logo" aria-label="INSALES — início"><Logo /></Link>
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
          {NAV.map((n) => (
            <NavLink key={n.id} to={n.to} data-testid={`nav-link-${n.id}`} className={navCls}>
              {({ isActive }) => (
                <>
                  {t(n.label)}
                  <span className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#FFC400] transition-transform duration-300 group-hover:scale-x-100 ${isActive ? "scale-x-100" : "scale-x-0"}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link to="/fale-conosco" data-testid="nav-cta-especialista"
            className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center gap-2 rounded-full bg-[#FFC400] px-5 py-2.5 text-sm font-bold text-[#070809] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(255,196,0,0.6)]">
            <T>Fale com Especialista</T> <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button data-testid="nav-mobile-toggle" aria-label="Menu" onClick={() => setOpen(!open)}
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full border border-white/15">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav data-testid="nav-mobile-menu" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            className="lg:hidden overflow-hidden border-t border-white/10">
            <div className="flex flex-col px-5 py-6 gap-1">
              {NAV.map((n, i) => (
                <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <NavLink to={n.to} data-testid={`nav-mobile-link-${n.id}`}
                    className={({ isActive }) => `font-display block py-2 text-3xl uppercase ${isActive ? "text-[#FFC400]" : ""}`}>{n.label}</NavLink>
                </motion.div>
              ))}
              <Link to="/fale-conosco" data-testid="nav-mobile-cta"
                className="mt-4 rounded-full bg-[#FFC400] py-3.5 text-center font-bold text-[#070809]"><T>Fale com Especialista</T></Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
