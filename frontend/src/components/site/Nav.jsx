import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { T, useLanguage } from "@/lib/i18n";
import { Logo } from "./Logo";
import { NAV } from "@/lib/content";
import servicePages from "@/lib/servicePages.json";

const LANGUAGE_OPTIONS = [
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
  { code: "en", label: "English" }
];
// Vector flags render consistently on Windows, macOS, Android and iOS.
const FlagIcon = ({code}) => (
  <svg viewBox="0 0 24 16" aria-hidden="true" focusable="false" className="h-4 w-6 shrink-0 overflow-hidden rounded-[2px] shadow-sm">
    {code==="pt"?<><rect width="24" height="16" fill="#199447"/><path d="M12 1 22 8 12 15 2 8Z" fill="#FFDF00"/><circle cx="12" cy="8" r="4" fill="#002776"/><path d="M8.2 6.5a12 12 0 0 1 7.6 2.3" fill="none" stroke="#fff" strokeWidth="1"/></>:
      code==="es"?<><rect width="24" height="16" fill="#AA151B"/><rect y="4" width="24" height="8" fill="#F1BF00"/><rect x="7" y="6" width="2" height="4" fill="#AA151B"/></>:
      <><rect width="24" height="16" fill="#fff"/>{Array.from({length:7},(_,i)=><rect key={i} y={i*2.28} width="24" height="1.23" fill="#B22234"/>)}<rect width="10" height="9" fill="#3C3B6E"/>{Array.from({length:5},(_,r)=>Array.from({length:4},(_,k)=><circle key={r+"-"+k} cx={1.2+k*2.4} cy={1+r*1.7} r=".38" fill="#fff"/>))}</>}
  </svg>
);

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
        <FlagIcon code={active.code}/><span>{lang.toUpperCase()}</span>
        <ChevronDown className={`h-3 w-3 text-[#FFC400] transition-transform ${expanded ? "rotate-180" : ""}`}/>
      </button>
      {expanded && <div role="group" aria-label="Site language" className="absolute right-0 top-full z-[80] mt-2 min-w-[176px] overflow-hidden rounded-2xl border border-[#FFC400]/25 bg-[#101114] p-1.5 shadow-2xl">
        {LANGUAGE_OPTIONS.map(option => <button key={option.code} type="button" lang={option.code==="pt"?"pt-BR":option.code==="en"?"en-US":option.code}
          aria-pressed={lang===option.code} onClick={()=>{setLang(option.code);setExpanded(false);}}
          data-testid={`language-option-${option.code}`}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/10 ${lang===option.code?"bg-[#FFC400]/10 text-[#FFC400]":"text-white"}`}>
          <FlagIcon code={option.code}/><span>{option.label}</span>
        </button>)}
      </div>}
    </div>
  );
};

export const Nav = () => {
  const {t} = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); setSolutionsOpen(false); setMobileSolutionsOpen(false); }, [pathname]);

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
          {NAV.map((n) => n.id==="servicos" ? (
            <div key={n.id} className="relative" onMouseEnter={()=>setSolutionsOpen(true)} onMouseLeave={()=>setSolutionsOpen(false)}
              onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setSolutionsOpen(false);}}>
              <button type="button" data-testid="solutions-desktop-toggle" onClick={()=>setSolutionsOpen(v=>!v)}
                aria-haspopup="true" aria-expanded={solutionsOpen}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors hover:text-[#FFC400] ${pathname.startsWith("/servicos")||solutionsOpen?"text-[#FFC400]":"text-[#d5d7db]"}`}>
                {t("Soluções")} <ChevronDown className={`h-4 w-4 transition-transform ${solutionsOpen?"rotate-180":""}`}/>
              </button>
              {solutionsOpen && <div data-testid="solutions-desktop-menu"
                className="absolute left-0 top-full z-[70] w-[min(740px,calc(100vw-80px))] pt-5">
                <div className="max-h-[70vh] overflow-y-auto rounded-3xl border border-[#FFC400]/25 bg-[#101114] p-5 shadow-2xl backdrop-blur-xl">
                  <Link to="/servicos" onClick={()=>setSolutionsOpen(false)}
                    className="mb-3 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm font-bold text-[#25D366] hover:bg-white/10"><T>Ver todas as soluções</T><ArrowUpRight className="h-4 w-4"/></Link>
                  <div className="grid gap-1 sm:grid-cols-2">
                    {servicePages.map(s=><Link key={s.slug} to={`/servicos/${s.slug}`} onClick={()=>setSolutionsOpen(false)}
                      data-testid={`solutions-desktop-${s.slug}`}
                      className="rounded-xl px-4 py-3 text-sm text-[#d5d7db] transition-colors hover:bg-[#25D366]/10 hover:text-[#25D366]">{t(s.name)}</Link>)}
                  </div>
                </div>
              </div>}
            </div>
          ) : (
            <NavLink key={n.id} to={n.to} data-testid={`nav-link-${n.id}`} className={navCls}>
              {({ isActive }) => (
                <>{t(n.label)}<span className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#FFC400] transition-transform duration-300 group-hover:scale-x-100 ${isActive ? "scale-x-100" : "scale-x-0"}`} /></>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link to="/fale-conosco" data-testid="nav-cta-especialista"
            className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-[#070809] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(255,196,0,0.6)]">
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
            className="lg:hidden overflow-hidden border-t border-white/10 bg-[#070809]/95 backdrop-blur-xl">
            <div className="flex flex-col px-5 py-6 gap-1">
              {NAV.map((n, i) => (
                <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  {n.id==="servicos" ? <>
                    <button type="button" onClick={()=>setMobileSolutionsOpen(v=>!v)}
                      data-testid="solutions-mobile-toggle" aria-expanded={mobileSolutionsOpen}
                      className="flex w-full items-center justify-between py-2 text-left font-display text-3xl uppercase">
                      {t("Soluções")} <ChevronDown className={`h-6 w-6 text-[#FFC400] transition-transform ${mobileSolutionsOpen?"rotate-180":""}`}/>
                    </button>
                    {mobileSolutionsOpen && <div data-testid="solutions-mobile-menu" className="mb-3 max-h-[45vh] space-y-1 overflow-y-auto border-l border-[#FFC400]/40 pl-4">
                      <Link to="/servicos" className="block py-2 text-sm font-bold text-[#25D366]"><T>Ver todas as soluções</T></Link>
                      {servicePages.map(s=><Link key={s.slug} to={`/servicos/${s.slug}`} className="block py-2 text-sm text-[#d5d7db] hover:text-[#25D366]">{t(s.name)}</Link>)}
                    </div>}
                  </> : <NavLink to={n.to} data-testid={`nav-mobile-link-${n.id}`}
                    className={({ isActive }) => `font-display block py-2 text-3xl uppercase ${isActive ? "text-[#FFC400]" : ""}`}>{t(n.label)}</NavLink>}
                </motion.div>
              ))}
              <Link to="/fale-conosco" data-testid="nav-mobile-cta"
                className="mt-4 rounded-full bg-[#25D366] py-3.5 text-center font-bold text-[#070809]"><T>Fale com Especialista</T></Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
