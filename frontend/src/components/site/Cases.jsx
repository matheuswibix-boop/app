import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { CASES, CLIENTS } from "@/lib/content";
import { Eyebrow, MaskLine } from "./Reveal";
import { LogoMarquee } from "./Marquee";

const CaseRow = ({ c, i }) => (
  <motion.article
    data-testid={`case-card-${c.key}`}
    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    className="group grid gap-6 border-t border-white/10 py-10 md:grid-cols-12 md:gap-10 md:py-14"
  >
    <div className="md:col-span-5">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-[#FFC400] [clip-path:inset(0_round_24px)] transition-[clip-path] duration-700 group-hover:[clip-path:inset(4%_round_32px)]">
        {c.img ? (
          <img src={c.img} alt={`Case ${c.client}`} loading="lazy"
            className="h-full w-full object-cover grayscale-[40%] transition-[transform,filter] duration-700 group-hover:scale-110 group-hover:grayscale-0" />
        ) : (
          <div className="grid h-full place-items-center p-10"><img src={c.logo} alt={c.client} className="max-h-24 object-contain" loading="lazy" /></div>
        )}
        <span className="font-mono absolute left-4 top-4 rounded-full bg-[#070809]/80 px-3 py-1 text-xs text-[#FFC400] backdrop-blur">0{i + 1} — {c.client}</span>
      </div>
    </div>
    <div className="flex flex-col justify-between md:col-span-7">
      <div>
        <p className="font-display text-5xl text-[#FFC400] sm:text-6xl lg:text-7xl leading-none">{c.metric}</p>
        <p className="mt-3 text-lg font-semibold md:text-xl">{c.label}</p>
      </div>
      <blockquote className="mt-8 flex gap-4 rounded-2xl border border-white/10 bg-[#111316] p-6">
        <Quote className="h-6 w-6 shrink-0 text-[#FFC400]" />
        <div>
          <p className="text-[#d5d7db] leading-relaxed">{c.quote}</p>
          <footer className="mt-3 text-sm text-[#AEB0B6]">{c.author}</footer>
        </div>
      </blockquote>
    </div>
  </motion.article>
);

export const Cases = () => (
  <section id="cases" data-testid="cases-section" className="px-5 py-24 md:px-10 md:py-32">
    <div className="mx-auto max-w-[1400px]">
      <Eyebrow>Nossos cases</Eyebrow>
      <h2 className="font-display mt-6 mb-14 uppercase leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">
        <MaskLine>Resultados que</MaskLine>
        <MaskLine delay={0.1}>viram <span className="text-[#FFC400]">história.</span></MaskLine>
      </h2>
      {CASES.map((c, i) => <CaseRow key={c.key} c={c} i={i} />)}
    </div>
    <div className="mt-16">
      <p className="font-mono mb-6 text-center text-xs uppercase tracking-[0.28em] text-[#AEB0B6]">Expertise gera confiança e resultados — empresas que confiam</p>
      <LogoMarquee logos={CLIENTS} />
    </div>
  </section>
);
