import { Mail, MapPin, Phone, Instagram } from "lucide-react";
import { CONTACT, getWhatsAppLink } from "@/lib/content";
import { T, useLanguage } from "@/lib/i18n";
import { Eyebrow, MaskLine, Reveal } from "./Reveal";
import { ContactForm7 } from "./ContactForm7";

const WhatsIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4zM12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z" /></svg>
);
export { WhatsIcon };

const Info = () => (
  <ul className="mt-10 space-y-5">
    {[
      [Phone, CONTACT.phone, CONTACT.phoneHref, "contact-phone"],
      [Mail, CONTACT.email, `mailto:${CONTACT.email}`, "contact-email"],
      [MapPin, CONTACT.address, CONTACT.maps, "contact-address"],
      [Instagram, CONTACT.instagramHandle, CONTACT.instagram, "contact-instagram"],
    ].map(([Icon, t, href, id]) => (
      <li key={id}>
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" data-testid={id}
          className="group flex items-start gap-4 text-[#d5d7db] transition-colors hover:text-white">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-[#FFC400] transition-colors group-hover:border-[#FFC400]"><Icon className="h-4 w-4" /></span>
          <span className="pt-2 text-sm md:text-base">{t}</span>
        </a>
      </li>
    ))}
  </ul>
);

export const Contact = () => {
  const {lang} = useLanguage();
  return (
  <section id="contato" data-testid="contact-section" className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32">
    <div className="pointer-events-none absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-[#FFC400]/10 blur-[140px]" />
    <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.2fr]">
      <div>
        <Eyebrow><T>Fale com especialista</T></Eyebrow>
        <h2 className="font-display mt-6 uppercase leading-[1] text-3xl sm:text-4xl lg:text-5xl">
          <MaskLine><T>Pronto para escalar seus</T> <span className="text-[#FFC400]"><T>resultados?</T></span></MaskLine>
        </h2>
        <Reveal>
          <p className="mt-6 max-w-md text-[#c2c4c9] leading-relaxed"><T>Receba um diagnóstico do seu cenário atual e descubra as oportunidades reais para crescer, com orientações e um plano personalizado.</T></p>
          <a href={getWhatsAppLink(lang)} target="_blank" rel="noreferrer" data-testid="contact-whatsapp-button"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-[#070809] transition-transform duration-300 hover:-translate-y-0.5">
            <WhatsIcon className="h-5 w-5" /> <T>Prefere WhatsApp? Chame agora</T>
          </a>
          <Info />
        </Reveal>
      </div>
      <Reveal delay={0.1}><ContactForm7 /></Reveal>
    </div>
  </section>
  );
};
