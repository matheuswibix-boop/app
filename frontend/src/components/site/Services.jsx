import { Link } from "react-router-dom";
import servicePages from "@/lib/servicePages.json";
import { Palette, Megaphone, Share2, Search, ShoppingCart, MousePointerClick, MonitorSmartphone, FileText, Clapperboard, Sparkles, ArrowUpRight, Bot, Workflow, TrendingUp } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { T, useLanguage } from "@/lib/i18n";
import { Eyebrow, MaskLine, Reveal } from "./Reveal";

const ICONS = { branding: Palette, meta: Megaphone, social: Share2, seo: Search, ecommerce: ShoppingCart, google: MousePointerClick, sites: MonitorSmartphone, materiais: FileText, videos: Clapperboard, geo: Sparkles, trafego: TrendingUp, ia: Bot, crm: Workflow };
const SERVICE_PATHS = Object.fromEntries(servicePages.map(s => [s.key, "/servicos/"+s.slug]));
const NEW_SERVICES = [
  {key:"trafego", n:"11", title:"Tráfego Pago", tag:"Performance", text:"Google e Meta trabalhando com dados e foco em oportunidades comerciais."},
  {key:"ia", n:"12", title:"IA de Atendimento", tag:"Inteligência artificial", text:"Pré-atendimento, qualificação e encaminhamento de leads com contexto."},
  {key:"crm", n:"13", title:"CRM e Automação Comercial", tag:"Processos de vendas", text:"Funil estruturado, integrações e automações para acompanhar cada oportunidade."}
];

const Card = ({ s, dup, grid }) => {
  const {t} = useLanguage();
  const Icon = ICONS[s.key];
  return (
    <article
      data-testid={dup ? undefined : `service-card-${s.key}`} aria-hidden={dup}
      className={`group relative flex shrink-0 flex-col rounded-3xl border border-white/10 bg-[#111316] p-7 transition-[border-color,background-color,transform] duration-500 hover:border-[#FFC400]/60 hover:bg-[#15181c] ${grid ? "h-full min-h-[300px] hover:-translate-y-1" : "h-[320px] w-[280px] md:h-[320px] md:w-[340px]"}`}
    >
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#FFC400]/30 text-[#FFC400] transition-colors duration-500 group-hover:bg-[#FFC400] group-hover:text-[#070809]">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-display text-3xl text-white/10 transition-colors duration-500 group-hover:text-[#FFC400]/40">{s.n}</span>
      </div>
      <div className="mt-8 md:mt-12">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#FFC400]">{t(s.tag)}</p>
        <h3 className="font-display mt-3 flex h-[2.4em] items-start uppercase leading-[1.1] text-lg md:text-xl">{t(s.title)}</h3>
        <div className="my-4 h-px w-full bg-white/10" />
        <p className="min-h-[4.5em] text-sm leading-relaxed text-[#c2c4c9]">{t(s.text)}</p>
      </div>
      <Link to={SERVICE_PATHS[s.key]} aria-label={"Conheça o serviço "+s.title} tabIndex={dup ? -1 : 0} className="absolute inset-0 z-10 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC400]" />
      <ArrowUpRight className="absolute right-7 top-[88px] h-5 w-5 text-[#FFC400] opacity-0 -translate-x-2 translate-y-2 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
    </article>
  );
};

export const ServicesGrid = () => (
  <section data-testid="services-grid-section" className="px-5 pb-24 md:px-10 md:pb-32">
    <div className="mx-auto grid max-w-[1400px] gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...SERVICES, ...NEW_SERVICES].map((s, i) => (
        <Reveal key={s.key} delay={(i % 4) * 0.06} className="h-full"><Card s={s} grid /></Reveal>
      ))}
    </div>
  </section>
);

export const Services = () => (
  <section id="servicos" data-testid="services-section" className="py-24 md:py-32">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow><T>Nossas soluções</T></Eyebrow>
          <h2 className="font-display mt-6 uppercase leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">
            <MaskLine><T>Soluções completas</T></MaskLine>
            <MaskLine delay={0.1}><T>para o seu</T> <span className="text-[#FFC400]"><T>crescimento</T></span></MaskLine>
          </h2>
        </div>
        <p className="max-w-sm text-[#c2c4c9]"><T>Um ecossistema único de aquisição: do primeiro clique à venda fechada no CRM.</T></p>
      </div>
    </div>
    <div data-testid="services-marquee" className="marquee-wrap mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
      <div className="marquee-track pausable flex gap-4 pr-4" style={{ "--dur": "70s" }}>
        {[...SERVICES, ...SERVICES].map((s, i) => <Card key={i} s={s} dup={i >= SERVICES.length} />)}
      </div>
    </div>
  </section>
);
