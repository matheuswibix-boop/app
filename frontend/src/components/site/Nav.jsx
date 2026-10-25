import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV } from "@/lib/content";

export const Nav = () => {
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
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <NavLink key={n.id} to={n.to} data-testid={`nav-link-${n.id}`} className={navCls}>
              {({ isActive }) => (
                <>
                  {n.label}
                  <span className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#FFC400] transition-transform duration-300 group-hover:scale-x-100 ${isActive ? "scale-x-100" : "scale-x-0"}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/fale-conosco" data-testid="nav-cta-especialista"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#FFC400] px-5 py-2.5 text-sm font-bold text-[#070809] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(255,196,0,0.6)]">
            Fale com Especialista <ArrowUpRight className="h-4 w-4" />
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
                className="mt-4 rounded-full bg-[#FFC400] py-3.5 text-center font-bold text-[#070809]">Fale com Especialista</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
