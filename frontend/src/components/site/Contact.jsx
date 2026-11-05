import { useRef, useState } from "react";
import { ArrowRight, Mail, MapPin, Phone, Instagram } from "lucide-react";
import { CONTACT, getWhatsAppLink } from "@/lib/content";
import { T, useLanguage } from "@/lib/i18n";
import { Eyebrow, MaskLine, Reveal } from "./Reveal";
import { getLeadAttribution, newSubmissionId } from "@/lib/leadAttribution";
import { formatBrazilPhone, isValidBrazilPhone } from "@/lib/phoneFormat";

const EMPTY = { name: "", email: "", phone: "", company: "", revenue: "", service: "", message: "" };
const REVENUES = ["Até R$ 50 mil/mês", "R$ 50 a 200 mil/mês", "R$ 200 mil a 1 mi/mês", "Acima de R$ 1 mi/mês"];
const SERVICES = ["Tráfego Pago", "SEO + GEO", "CRM e Automação", "IA para Vendas", "Site / E-commerce", "Ainda não sei"];

const inputCls = "w-full rounded-xl border border-white/15 bg-[#070809] px-4 py-3.5 text-sm text-white placeholder:text-[#8d9096] outline-none transition-[border-color,box-shadow] focus:border-[#FFC400] focus:shadow-[0_0_0_3px_rgba(255,196,0,0.15)]";


const Field = ({ label, children }) => {
 const {t} = useLanguage();
 return (
  <label className="block">
    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#AEB0B6]">{t(label)}</span>
    {children}
  </label>
 );
};

const WhatsIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4zM12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z" /></svg>
);
export { WhatsIcon };

const Form = () => {
  const {t,lang} = useLanguage();
  const [f, setF] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [website, setWebsite] = useState(""); // Honeypot; should remain blank.
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const submissionId = useRef(null);
  const set = (k) => (e) => {
    setError("");
    setF(current => ({ ...current, [k]: k === "phone" ? formatBrazilPhone(e.target.value) : e.target.value }));
  };
  const submit = async (e) => {
    e.preventDefault();
    if(busy) return;
    if (!isValidBrazilPhone(f.phone)) {
      setError(t("Informe um telefone brasileiro válido com DDD."));
      return;
    }
    if(!submissionId.current) submissionId.current=newSubmissionId();
    if(!submissionId.current) {setError(t("Não foi possível iniciar o envio. Atualize seu navegador e tente novamente."));return;}
    setBusy(true);setError("");
    try {
      const controller=new AbortController();
      const timeout=window.setTimeout(()=>controller.abort(),45000);
      let response;
      try {
        response=await fetch("/wp-json/insales/v1/lead",{
          method:"POST",
          headers:{"Content-Type":"application/json","Accept":"application/json"},
          credentials:"same-origin",
          body:JSON.stringify({
            ...f,locale:lang,utm:getLeadAttribution(), privacy_consent:privacyConsent,
            submission_id:submissionId.current,
            source_path:window.location.pathname,
            website
          }),
          signal:controller.signal
        });
      } finally {window.clearTimeout(timeout);}
      let result={};
      try {result=await response.json();} catch { /* Handle an unavailable endpoint */ }
      if(!response.ok || !result.success || !result.deal_id) {
        // Operational diagnostics only: no personal data, API token, or request body.
        console.warn("[INSALES CRM] Submission rejected", {
          status: response.status, code: result.code || "PIPEDRIVE_NOT_CONFIRMED"
        });
        throw new Error(result.code||"PIPEDRIVE_NOT_CONFIRMED");
      }
      setSuccess(true);
      const lines=[
        t("Olá! Vim pelo site da INSALES e gostaria de agendar minha Consultoria Estratégica."),
        t("Nome: ") + f.name,
        t("Empresa: ") + (f.company||t("Não informado")),
        "E-mail: "+f.email,
        "WhatsApp: "+f.phone,
        t("Faturamento: ")+t(f.revenue),
        t("Interesse: ")+t(f.service),
        t("Desafio: ")+(f.message||t("Quero conversar sobre oportunidades de crescimento."))
      ];
      window.location.assign("https://wa.me/5541996617279?text="+encodeURIComponent(lines.join("\n")));
    } catch (err) {
      if (err?.name === "AbortError") {
        console.warn("[INSALES CRM] Request timed out, do not create a new submission ID.");
      }
      setError(t("Não foi possível confirmar seu cadastro no momento. Seus dados foram mantidos; tente novamente."));
    } finally {setBusy(false);}
  };
  return (
    <form id="formulario" onSubmit={submit} data-testid="lead-form"
      className="scroll-mt-28 grid gap-4 rounded-3xl border border-white/10 bg-[#111316] p-6 sm:grid-cols-2 md:p-10">
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label>Website <input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></label>
      </div>
      <Field label="Nome *"><input required minLength={2} maxLength={120} value={f.name} onChange={set("name")} name="lead-name" data-testid="lead-input-name" className={inputCls} placeholder={t("Seu nome")} disabled={busy}/></Field>
      <Field label="Empresa"><input maxLength={150} value={f.company} onChange={set("company")} data-testid="lead-input-company" className={inputCls} placeholder={t("Nome da empresa")} disabled={busy}/></Field>
      <Field label="E-mail *"><input required type="email" maxLength={160} value={f.email} onChange={set("email")} data-testid="lead-input-email" className={inputCls} placeholder={t("voce@empresa.com.br")} disabled={busy}/></Field>
      <Field label="Telefone/WhatsApp *"><input required type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={17} value={f.phone} onChange={set("phone")} data-testid="lead-input-phone" className={inputCls} placeholder={t("(41) 9 9999-9999")} disabled={busy}/></Field>
      <Field label="Faturamento *"><select required value={f.revenue} onChange={set("revenue")} data-testid="lead-select-revenue" className={inputCls} disabled={busy}><option value="">{t("Selecione")}</option>{REVENUES.map(v=><option key={v} value={v}>{t(v)}</option>)}</select></Field>
      <Field label="Interesse *"><select required value={f.service} onChange={set("service")} data-testid="lead-select-service" className={inputCls} disabled={busy}><option value="">{t("Selecione")}</option>{SERVICES.map(v=><option key={v} value={v}>{t(v)}</option>)}</select></Field>
      <div className="sm:col-span-2"><Field label="Conte sobre seu desafio"><textarea rows={4} maxLength={2000} value={f.message} onChange={set("message")} data-testid="lead-input-message" className={inputCls} placeholder={t("Ex.: queremos reduzir o CAC e escalar as vendas online")} disabled={busy}/></Field></div>
      <label className="sm:col-span-2 flex items-start gap-3 text-xs leading-relaxed text-[#AEB0B6]">
        <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#25D366]" required
          data-testid="lead-privacy-consent" checked={privacyConsent}
          onChange={e=>setPrivacyConsent(e.target.checked)} disabled={busy}/>
        <T>Autorizo o uso dos meus dados para contato comercial e registro no CRM, conforme a Política de Privacidade.</T>
      </label>
      {error && <p role="alert" data-testid="lead-form-error" className="sm:col-span-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
      {success && <p role="status" className="sm:col-span-2 text-sm text-[#25D366]"><T>Cadastro confirmado. Abrindo WhatsApp...</T></p>}
      <button type="submit" disabled={busy} aria-busy={busy} data-testid="lead-form-submit-button"
        className="group sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-bold text-[#070809] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">
        {busy?t("Registrando sua solicitação..."):t("Solicitar Consultoria Estratégica")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
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
      <Reveal delay={0.1}><Form /></Reveal>
    </div>
  </section>
  );
};
