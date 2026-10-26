import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Check, Loader2, Mail, MapPin, Phone, Instagram } from "lucide-react";
import { CONTACT } from "@/lib/content";
import { Eyebrow, MaskLine, Reveal } from "./Reveal";

const API = "/api";
const EMPTY = { name: "", email: "", phone: "", company: "", revenue: "", service: "", message: "", website: "" };
const REVENUES = ["Até R$ 50 mil/mês", "R$ 50 a 200 mil/mês", "R$ 200 mil a 1 mi/mês", "Acima de R$ 1 mi/mês"];
const SERVICES = ["Tráfego Pago", "SEO + GEO", "CRM e Automação", "IA para Vendas", "Site / E-commerce", "Ainda não sei"];

const inputCls = "w-full rounded-xl border border-white/15 bg-[#070809] px-4 py-3.5 text-sm text-white placeholder:text-[#8d9096] outline-none transition-[border-color,box-shadow] focus:border-[#FFC400] focus:shadow-[0_0_0_3px_rgba(255,196,0,0.15)]";

const errText = (d) => (typeof d === "string" ? d : Array.isArray(d) ? "Verifique os campos: e-mail e telefone válidos são obrigatórios." : "Não foi possível salvar seu contato. Tente novamente ou fale conosco pelo WhatsApp ao lado.");

const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#AEB0B6]">{label}</span>
    {children}
  </label>
);

const WhatsIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4zM12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z" /></svg>
);
export { WhatsIcon };

const Form = () => {
  const [f, setF] = useState(EMPTY);
  const [state, setState] = useState("idle");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState("loading");
    try {
      const params = new URLSearchParams(window.location.search);
      const attribution = new URLSearchParams();
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
        if (params.has(key)) attribution.set(key, params.get(key).slice(0, 60));
      });
      const source = (window.location.pathname + (attribution.size ? "?" + attribution.toString() : "")).slice(0, 500);
      const { data } = await axios.post(`${API}/leads`, { ...f, source }, { timeout: 30000 });
      if (data?.ok !== true || !data.id) throw new Error("Resposta inválida do servidor");
      setState("done");
      setF(EMPTY);
      toast.success("Recebemos seu contato! Um especialista vai falar com você em breve.");
    } catch (err) {
      setState("idle");
      toast.error(errText(err?.response?.data?.detail));
    }
  };

  if (state === "done") {
    return (
      <div data-testid="lead-form-success" className="flex min-h-[420px] flex-col items-start justify-center rounded-3xl border border-[#FFC400]/40 bg-[#111316] p-8 md:p-10">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#FFC400] text-[#070809]"><Check className="h-6 w-6" /></span>
        <h3 className="font-display mt-6 text-3xl uppercase">Recebido!</h3>
        <p className="mt-3 max-w-md text-[#c2c4c9]">Nossa equipe vai analisar seu cenário e entrar em contato. Quer agilizar? Chame no WhatsApp.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" data-testid="lead-success-whatsapp" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-[#070809]"><WhatsIcon className="h-4 w-4" /> Chamar no WhatsApp</a>
          <button data-testid="lead-form-new" onClick={() => setState("idle")} className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold">Enviar outro</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} data-testid="lead-form" className="grid gap-4 rounded-3xl border border-white/10 bg-[#111316] p-6 sm:grid-cols-2 md:p-10">
      <input name="website" aria-hidden="true" tabIndex={-1} autoComplete="off" hidden value={f.website} onChange={set("website")} />
      <Field label="Nome *"><input required minLength={2} maxLength={120} value={f.name} onChange={set("name")} data-testid="lead-input-name" className={inputCls} placeholder="Seu nome" /></Field>
      <Field label="Empresa"><input maxLength={120} value={f.company} onChange={set("company")} data-testid="lead-input-company" className={inputCls} placeholder="Nome da empresa" /></Field>
      <Field label="E-mail *"><input required type="email" maxLength={254} autoComplete="email" value={f.email} onChange={set("email")} data-testid="lead-input-email" className={inputCls} placeholder="voce@empresa.com.br" /></Field>
      <Field label="WhatsApp *"><input required type="tel" inputMode="tel" autoComplete="tel" minLength={10} maxLength={30} value={f.phone} onChange={set("phone")} data-testid="lead-input-phone" className={inputCls} placeholder="(41) 90000-0000" /></Field>
      <Field label="Faturamento">
        <select value={f.revenue} onChange={set("revenue")} data-testid="lead-select-revenue" className={inputCls}>
          <option value="">Selecione</option>{REVENUES.map((r) => <option key={r}>{r}</option>)}
        </select>
      </Field>
      <Field label="Interesse">
        <select value={f.service} onChange={set("service")} data-testid="lead-select-service" className={inputCls}>
          <option value="">Selecione</option>{SERVICES.map((r) => <option key={r}>{r}</option>)}
        </select>
      </Field>
      <div className="sm:col-span-2">
        <Field label="Conte sobre seu desafio"><textarea maxLength={2000} rows={4} value={f.message} onChange={set("message")} data-testid="lead-input-message" className={inputCls} placeholder="Ex.: queremos reduzir o CAC e escalar as vendas online" /></Field>
      </div>
      <button type="submit" disabled={state === "loading"} data-testid="lead-form-submit-button"
        className="group sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#FFC400] px-6 py-4 font-bold text-[#070809] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(255,196,0,0.7)] disabled:opacity-70">
        {state === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Quero meu diagnóstico <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
      </button>
    </form>
  );
};

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

export const Contact = () => (
  <section id="contato" data-testid="contact-section" className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32">
    <div className="pointer-events-none absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-[#FFC400]/10 blur-[140px]" />
    <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.2fr]">
      <div>
        <Eyebrow>Fale com especialista</Eyebrow>
        <h2 className="font-display mt-6 uppercase leading-[1] text-3xl sm:text-4xl lg:text-5xl">
          <MaskLine>Pronto para escalar seus <span className="text-[#FFC400]">resultados?</span></MaskLine>
        </h2>
        <Reveal>
          <p className="mt-6 max-w-md text-[#c2c4c9] leading-relaxed">Receba um diagnóstico do seu cenário atual e descubra as oportunidades reais para crescer, com orientações e um plano personalizado.</p>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" data-testid="contact-whatsapp-button"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-[#070809] transition-transform duration-300 hover:-translate-y-0.5">
            <WhatsIcon className="h-5 w-5" /> Prefere WhatsApp? Chame agora
          </a>
          <Info />
        </Reveal>
      </div>
      <Reveal delay={0.1}><Form /></Reveal>
    </div>
  </section>
);
