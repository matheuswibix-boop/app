import { motion } from "framer-motion";
import { Megaphone, Search, Workflow, Bot, MonitorSmartphone, Clapperboard, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { Eyebrow, MaskLine } from "./Reveal";

const ICONS = { trafego: Megaphone, seo: Search, crm: Workflow, ia: Bot, site: MonitorSmartphone, video: Clapperboard };

const Bars = () => (
  <div className="absolute bottom-0 right-0 flex h-40 items-end gap-2 p-8 opacity-90">
    {[28, 42, 36, 58, 50, 74, 68, 96].map((h, i) => (
      <motion.span key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
        transition={{ delay: 0.3 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`w-3 rounded-sm md:w-4 ${i === 7 ? "bg-[#FFC400]" : "bg-[#FFC400]/25"}`} />
    ))}
  </div>
);

const Card = ({ s, i }) => {
  const Icon = ICONS[s.key];
  return (
    <motion.article
      data-testid={`service-card-${s.key}`}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex min-h-[230px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111316] p-7 transition-[border-color,background-color] duration-500 hover:border-[#FFC400]/60 hover:bg-[#15181c] md:p-8 ${s.span} ${s.big ? "md:min-h-[480px] bg-gradient-to-br from-[#1a1a12] to-[#111316]" : ""}`}
    >
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#FFC400]/30 text-[#FFC400] transition-colors duration-500 group-hover:bg-[#FFC400] group-hover:text-[#070809]">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-mono text-xs text-[#AEB0B6]">{s.n} / {s.tag}</span>
      </div>
      <div className="mt-auto pt-10 relative z-10">
        <h3 className={`font-display uppercase leading-[0.95] ${s.big ? "text-4xl md:text-6xl" : "text-xl md:text-2xl"}`}>{s.title}</h3>
        <p className={`mt-3 text-[#c2c4c9] leading-relaxed ${s.big ? "max-w-sm text-base md:text-lg" : "text-sm"}`}>{s.text}</p>
      </div>
      <ArrowUpRight className="absolute right-7 bottom-7 h-5 w-5 text-[#FFC400] opacity-0 -translate-x-2 translate-y-2 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
      {s.big && <Bars />}
    </motion.article>
  );
};

export const Services = () => (
  <section id="servicos" data-testid="services-section" className="px-5 py-24 md:px-10 md:py-32">
    <div className="mx-auto max-w-[1400px]">
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
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[minmax(230px,auto)]">
        {SERVICES.map((s, i) => <Card key={s.key} s={s} i={i} />)}
      </div>
    </div>
  </section>
);
