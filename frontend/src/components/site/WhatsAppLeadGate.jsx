import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { captureLeadAttribution } from "@/lib/leadAttribution";

// All outbound WhatsApp links require the contact form first.
// The existing Contact Form 7 integration owns lead submission and follow-up.
export function WhatsAppLeadGate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => { captureLeadAttribution(); }, [pathname]);
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
        document.querySelector("#formulario input:not([type=hidden]):not([tabindex='-1'])")?.focus({ preventScroll: true });
      } else {
        navigate("/fale-conosco#formulario");
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate, pathname]);
  return null;
}
