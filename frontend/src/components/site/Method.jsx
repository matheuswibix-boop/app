import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { PRIMA, RESULTS } from "@/lib/content";
import { Eyebrow, MaskLine, Reveal } from "./Reveal";
import { BarChart3, TrendingDown, Rocket } from "lucide-react";

const RICONS = [BarChart3, TrendingDown, Rocket];

export const Method = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="metodologia" data-testid="method-section" className="relative bg-[#0b0c0e] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <Eyebrow>Nosso método</Eyebrow>
            <h2 className="font-display mt-6 uppercase leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">
              <MaskLine>Método</MaskLine>
              <MaskLine delay={0.1} className="text-[#FFC400]">PRIMA.</MaskLine>
            </h2>
          </div>
          <Reveal>
            <p className="text-lg text-[#c2c4c9] leading-relaxed">
              O Método PRIMA transforma dados de marketing e vendas em decisões comerciais. Planejamos antes de anunciar, rastreamos a origem de cada oportunidade, integramos o CRM e melhoramos a operação para crescer com controle — <span className="text-white font-semibold">do clique ao fechamento e à receita.</span>
            </p>
          </Reveal>
        </div>

        <div className="mt-9 flex flex-wrap gap-4"><Link to="/metodologia" className="inline-flex rounded-full border border-[#FFC400]/70 px-6 py-3 font-bold text-[#FFC400] transition-colors hover:bg-[#FFC400] hover:text-[#070809]">Entenda o método completo →</Link><Link to="/consultoria-estrategica" className="inline-flex rounded-full bg-[#FFC400] px-6 py-3 font-bold text-[#070809] transition-transform hover:-translate-y-1">Solicitar consultoria estratégica →</Link></div>
        <div ref={ref} className="relative mt-20">
          <div className="absolute left-0 right-0 top-[62px] hidden h-px bg-white/10 lg:block" />
          <motion.div style={{ scaleX: line }} className="absolute left-0 right-0 top-[62px] hidden h-px origin-left bg-[#FFC400] lg:block" />
          <ol className="grid gap-4 lg:grid-cols-5 lg:gap-6">
            {PRIMA.map((p, i) => (
              <Reveal key={p.l} delay={i * 0.08}>
                <li data-testid={`prima-step-${p.l.toLowerCase()}`}
                  className="group relative flex gap-6 rounded-3xl border border-white/10 bg-[#111316] p-6 transition-colors duration-500 hover:border-[#FFC400]/50 lg:block lg:border-0 lg:bg-transparent lg:p-0">
                  <span className="font-display relative z-10 grid h-[88px] w-[88px] shrink-0 place-items-center rounded-full border border-[#FFC400]/50 bg-[#0b0c0e] text-5xl text-[#FFC400] transition-[background-color,color,box-shadow] duration-500 group-hover:bg-[#FFC400] group-hover:text-[#070809] group-hover:shadow-[0_0_40px_rgba(255,196,0,0.5)] lg:mx-0 lg:h-[124px] lg:w-[124px] lg:text-7xl">
                    {p.l}
                  </span>
                  <div className="lg:mt-8">
                    <span className="font-mono text-xs text-[#AEB0B6]">0{i + 1}</span>
                    <h3 className="font-display mt-1 text-xl uppercase">{p.t}</h3>
                    <p className="mt-2 text-sm text-[#c2c4c9] leading-relaxed">{p.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-20">
          <div data-testid="results-band" className="grid overflow-hidden rounded-3xl border border-[#FFC400]/25 bg-[#111316] md:grid-cols-3">
            {RESULTS.map((r, i) => {
              const Icon = RICONS[i];
              return (
                <div key={r.v} data-testid={`result-${i}`} className={`flex items-center gap-5 p-8 md:p-10 ${i ? "border-t border-white/10 md:border-l md:border-t-0" : ""}`}>
                  <Icon className="h-10 w-10 shrink-0 text-[#FFC400]" />
                  <div>
                    <p className="font-display text-4xl md:text-5xl text-[#FFC400]">{r.v}</p>
                    <p className="mt-1 text-sm text-[#c2c4c9]">{r.l}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-[#AEB0B6]">Médias de projetos acompanhados pela INSALES. Resultados variam conforme mercado e investimento.</p>
        </Reveal>
      </div>
    </section>
  );
};
