import { Palette, Megaphone, Share2, Search, ShoppingCart, MousePointerClick, MonitorSmartphone, FileText, Clapperboard, Sparkles, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { Eyebrow, MaskLine } from "./Reveal";

const ICONS = { branding: Palette, meta: Megaphone, social: Share2, seo: Search, ecommerce: ShoppingCart, google: MousePointerClick, sites: MonitorSmartphone, materiais: FileText, videos: Clapperboard, geo: Sparkles };

const Card = ({ s, dup }) => {
  const Icon = ICONS[s.key];
  return (
    <article
      data-testid={dup ? undefined : `service-card-${s.key}`} aria-hidden={dup}
      className="group relative flex h-[320px] w-[280px] shrink-0 flex-col rounded-3xl border border-white/10 bg-[#111316] p-7 transition-[border-color,background-color] duration-500 hover:border-[#FFC400]/60 hover:bg-[#15181c] md:h-[320px] md:w-[340px]"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#FFC400]/30 text-[#FFC400] transition-colors duration-500 group-hover:bg-[#FFC400] group-hover:text-[#070809]">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-display text-3xl text-white/10 transition-colors duration-500 group-hover:text-[#FFC400]/40">{s.n}</span>
      </div>
      <div className="mt-8 md:mt-12">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#FFC400]">{s.tag}</p>
        <h3 className="font-display mt-3 flex h-[2.4em] items-start uppercase leading-[1.1] text-lg md:text-xl">{s.title}</h3>
        <div className="my-4 h-px w-full bg-white/10" />
        <p className="min-h-[4.5em] text-sm leading-relaxed text-[#c2c4c9]">{s.text}</p>
      </div>
      <ArrowUpRight className="absolute right-7 top-[88px] h-5 w-5 text-[#FFC400] opacity-0 -translate-x-2 translate-y-2 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
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
      <div className="marquee-track pausable flex gap-4 pr-4" style={{ "--dur": "70s" }}>
        {[...SERVICES, ...SERVICES].map((s, i) => <Card key={i} s={s} dup={i >= SERVICES.length} />)}
      </div>
    </div>
  </section>
);
