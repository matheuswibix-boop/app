import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// All outbound WhatsApp links require the contact form first.
// No lead persistence: after completing the form the visitor must confirm send in WhatsApp.
export function WhatsAppLeadGate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest?.("a[href]");
      if (!anchor) return;
      let host;
      try { host = new URL(anchor.href, window.location.href).hostname.toLowerCase(); } catch { return; }
      if (!["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(host)) return;
      event.preventDefault();
      event.stopPropagation();
      if (pathname === "/fale-conosco") {
        window.history.replaceState(window.history.state, "", "/fale-conosco#formulario");
        document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelector("#formulario input[name=lead-name]")?.focus({ preventScroll: true });
      } else {
        navigate("/fale-conosco#formulario");
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate, pathname]);
  return null;
}
