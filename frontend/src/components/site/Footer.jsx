import { Instagram } from "lucide-react";
import { CONTACT, NAV } from "@/lib/content";
import { Logo } from "./Logo";
import { useGoTo } from "./Nav";
import { WhatsIcon } from "./Contact";

export const Footer = () => {
  const goTo = useGoTo();
  return (
    <footer data-testid="site-footer" className="border-t border-[#FFC400]/30 px-5 pt-20 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-[#c2c4c9]">Hub de Marketing e Vendas. Resultados que geram grandes negócios.</p>
          <a href={CONTACT.instagram} target="_blank" rel="noreferrer" data-testid="footer-instagram"
            className="mt-6 inline-grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-[#FFC400] hover:text-[#FFC400]" aria-label="Instagram">
            <Instagram className="h-5 w-5" />
          </a>
        </div>
        <ul className="space-y-3">
          {NAV.map((n) => (
            <li key={n.id}><button data-testid={`footer-link-${n.id}`} onClick={() => goTo(n.id)} className="text-sm text-[#d5d7db] hover:text-[#FFC400] transition-colors">{n.label}</button></li>
          ))}
        </ul>
        <div className="space-y-3 text-sm text-[#d5d7db]">
          <p className="font-semibold text-white">Contato</p>
          <a href={CONTACT.phoneHref} data-testid="footer-phone" className="block hover:text-[#FFC400]">{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`} data-testid="footer-email" className="block hover:text-[#FFC400]">{CONTACT.email}</a>
          <a href={CONTACT.maps} target="_blank" rel="noreferrer" data-testid="footer-address" className="block hover:text-[#FFC400]">{CONTACT.address}</a>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col gap-2 border-t border-white/10 py-6 text-xs text-[#AEB0B6] md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} INSALES Marketing. Todos os direitos reservados.</span>
        <span>Parte do Grupo GGV · Curitiba - PR</span>
      </div>
    </footer>
  );
};

export const WhatsFloat = () => (
  <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" data-testid="whatsapp-floating-button" aria-label="Falar no WhatsApp"
    className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-[#070809] shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-110">
    <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
    <WhatsIcon className="relative h-7 w-7" />
  </a>
);
