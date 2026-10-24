import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { COMPANIES, SEALS } from "@/lib/content";
import { Eyebrow, MaskLine, Reveal } from "./Reveal";

const Team = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <div ref={ref} className="relative grid items-center gap-10 lg:grid-cols-[0.75fr_1.5fr]">
      <div className="relative z-10 pb-4">
        <Eyebrow>Sócios-diretores</Eyebrow>
        <h3 className="font-display mt-6 uppercase leading-[0.95] text-3xl sm:text-4xl lg:text-5xl">
          <MaskLine>Estratégia, dados</MaskLine>
          <MaskLine delay={0.08}>e pessoas que</MaskLine>
          <MaskLine delay={0.16} className="text-[#FFC400]">fazem a diferença.</MaskLine>
        </h3>
        <Reveal><p className="mt-6 max-w-md text-[#c2c4c9] leading-relaxed">Uma liderança com visão de futuro, experiência prática e compromisso real com o crescimento dos nossos clientes.</p></Reveal>
      </div>
      <Reveal>
        <div className="relative aspect-[2/1] overflow-hidden rounded-3xl border border-[#FFC400]/25 sm:aspect-[1536/655]">
          <motion.img style={{ y }} src="/img/socios.webp" alt="Sócios-diretores da INSALES" loading="lazy" data-testid="team-image"
            className="h-full w-full scale-110 object-cover object-[92%_30%] sm:object-center" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070809]/50 via-transparent to-transparent" />
        </div>
      </Reveal>
    </div>
  );
};

const Group = () => (
  <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
    <Reveal>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
        <img src="/img/predio.webp" alt="Sede do Grupo GGV" loading="lazy" className="h-full w-full object-cover object-[70%_50%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070809]/90 to-transparent" />
        <p className="font-display absolute bottom-6 left-6 right-6 text-2xl uppercase md:text-3xl">Somos <span className="text-[#FFC400]">Gente Gerando Valor</span></p>
      </div>
    </Reveal>
    <div>
      <Eyebrow>Sobre nós</Eyebrow>
      <h2 className="font-display mt-6 uppercase leading-[0.95] text-4xl sm:text-5xl">
        <MaskLine>Fazemos parte</MaskLine>
        <MaskLine delay={0.1}>do <span className="text-[#FFC400]">Grupo GGV.</span></MaskLine>
      </h2>
      <Reveal>
        <p className="mt-6 text-[#c2c4c9] leading-relaxed text-lg">
          Um grupo de empresas especializado em Gestão, Marketing e Vendas, com mais de 100 colaboradores e mais de 2.000 empresas atendidas no Brasil, Estados Unidos, Reino Unido e China.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {SEALS.map((s) => (
            <span key={s} className="grid h-16 w-28 place-items-center rounded-xl bg-[#F7F8F8] p-2">
              <img src={`/img/logos/${s}.webp`} alt={s.replace("selo_", "").replace(/_/g, " ")} loading="lazy" className="max-h-12 object-contain" />
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  </div>
);

const Companies = () => (
  <div>
    <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#AEB0B6]">Nossas empresas</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {COMPANIES.map((c, i) => (
        <Reveal key={c.key} delay={i * 0.08}>
          <div data-testid={`company-card-${c.key}`} className="group h-full rounded-3xl border border-white/10 bg-[#111316] p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-[#FFC400]/50">
            <div className="grid h-16 place-items-center rounded-xl bg-[#F7F8F8] px-4">
              <img src={c.logo} alt={c.key} loading="lazy" className="max-h-10 object-contain" />
            </div>
            <p className="mt-5 text-sm text-[#c2c4c9] leading-relaxed">{c.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

export const About = () => (
  <section id="sobre" data-testid="about-section" className="bg-[#0b0c0e] px-5 py-24 md:px-10 md:py-32">
    <div className="mx-auto flex max-w-[1400px] flex-col gap-24">
      <Group />
      <Companies />
      <Team />
    </div>
  </section>
);
