import { Megaphone, Search, Workflow, Bot, MonitorSmartphone, Clapperboard, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { Eyebrow, MaskLine } from "./Reveal";

const ICONS = { trafego: Megaphone, seo: Search, crm: Workflow, ia: Bot, site: MonitorSmartphone, video: Clapperboard };

const Card = ({ s, dup }) => {
  const Icon = ICONS[s.key];
  return (
    <article
      data-testid={dup ? undefined : `service-card-${s.key}`} aria-hidden={dup}
      className="group relative flex h-[320px] w-[290px] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111316] p-7 transition-[border-color,background-color] duration-500 hover:border-[#FFC400]/60 hover:bg-[#15181c] md:h-[360px] md:w-[380px] md:p-8"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#FFC400]/30 text-[#FFC400] transition-colors duration-500 group-hover:bg-[#FFC400] group-hover:text-[#070809]">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-mono text-xs text-[#AEB0B6]">{s.n} / {s.tag}</span>
      </div>
      <div className="mt-auto pt-10 relative z-10">
        <h3 className="font-display uppercase leading-[0.95] text-2xl md:text-3xl">{s.title}</h3>
        <p className="mt-3 text-sm text-[#c2c4c9] leading-relaxed md:text-base">{s.text}</p>
      </div>
      <ArrowUpRight className="absolute right-7 bottom-7 h-5 w-5 text-[#FFC400] opacity-0 -translate-x-2 translate-y-2 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
    </article>
  );
};

export const Services = () => (
  <section id="servicos" data-testid="services-section" className="py-24 md:py-32">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>Nossos serviços</Eyebrow>
          <h2 className="font-display mt-6 uppercase leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">
            <MaskLine>Soluções completas</MaskLine>
            <MaskLine delay={0.1}>para o seu <span className="text-[#FFC400]">crescimento</span></MaskLine>
          </h2>
        </div>
        <p className="max-w-sm text-[#c2c4c9]">Um ecossistema único de aquisição: do primeiro clique à venda fechada no CRM.</p>
      </div>
    </div>
    <div data-testid="services-marquee" className="marquee-wrap mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
      <div className="marquee-track pausable flex gap-4 pr-4" style={{ "--dur": "45s" }}>
        {[...SERVICES, ...SERVICES].map((s, i) => <Card key={i} s={s} dup={i >= SERVICES.length} />)}
      </div>
    </div>
  </section>
);
