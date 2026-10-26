import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { COMPANIES } from "@/lib/content";
import { T, useLanguage } from "@/lib/i18n";
import { Eyebrow, MaskLine, Reveal } from "./Reveal";

const Team = () => {
  const {t} = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} data-testid="team-block" className="relative flex flex-col overflow-hidden rounded-3xl border border-[#FFC400]/20 bg-[#070809] lg:block lg:aspect-[1536/655]">
      <div className="relative aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
        <motion.img style={{ y }} src="/img/socios.webp" alt={t("Sócios-diretores da INSALES")} loading="lazy" data-testid="team-image"
          className="absolute inset-0 h-full w-full object-cover object-[95%_20%] lg:object-center lg:scale-[1.12]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070809] via-[#070809]/40 via-45% to-transparent lg:bg-gradient-to-r lg:from-[#070809] lg:via-[#070809]/75 lg:to-transparent lg:via-35%" />
      <div className="relative z-10 -mt-10 flex flex-col p-6 sm:p-10 lg:mt-0 lg:h-full lg:max-w-[46%] lg:justify-center lg:p-12 xl:p-14">
        <Eyebrow><T>Sócios-diretores</T></Eyebrow>
        <h3 className="font-display mt-5 uppercase leading-[1.05] text-xl sm:text-2xl xl:text-3xl">
          <MaskLine><T>Estratégia, dados e pessoas que fazem</T> <span className="text-[#FFC400]"><T>a diferença.</T></span></MaskLine>
        </h3>
        <Reveal><p className="mt-4 max-w-md text-sm text-[#d5d7db] leading-relaxed"><T>Uma liderança com visão de futuro, experiência prática e compromisso real com o crescimento dos nossos clientes.</T></p></Reveal>
      </div>
    </div>
  );
};

const Group = () => (
  <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
    <div>
      <Eyebrow><T>Sobre nós</T></Eyebrow>
      <h2 className="font-display mt-6 uppercase leading-[0.95] text-4xl sm:text-5xl">
        <MaskLine><T>Fazemos parte</T></MaskLine>
        <MaskLine delay={0.1}><T>do</T> <span className="text-[#FFC400]"><T>Grupo GGV.</T></span></MaskLine>
      </h2>
    </div>
    <Reveal>
      <p className="text-[#c2c4c9] leading-relaxed text-lg">
        <T>Um grupo de empresas especializado em Gestão, Marketing e Vendas, com mais de 100 colaboradores e mais de 2.000 empresas atendidas no Brasil, Estados Unidos, Reino Unido e China.</T> <span className="text-white font-semibold"><T>Somos Gente Gerando Valor.</T></span>
      </p>
    </Reveal>
  </div>
);

const Companies = () => {
  const {t} = useLanguage();
  return (
  <div>
    <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#AEB0B6]"><T>Nossas empresas</T></p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {COMPANIES.map((c, i) => (
        <Reveal key={c.key} delay={i * 0.08}>
          <div data-testid={`company-card-${c.key}`} className="group h-full rounded-3xl border border-white/10 bg-[#111316] p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-[#FFC400]/50">
            <div className="flex h-16 items-center">
              <img src={c.logo} alt={c.key} loading="lazy" className="max-h-10 max-w-[180px] object-contain brightness-0 invert opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <p className="mt-5 text-sm text-[#c2c4c9] leading-relaxed">{t(c.text)}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
  );
};

export const About = () => (
  <section id="sobre" data-testid="about-section" className="bg-[#0b0c0e] px-5 py-24 md:px-10 md:py-32">
    <div className="mx-auto flex max-w-[1400px] flex-col gap-24">
      <Group />
      <Companies />
      <Team />
    </div>
  </section>
);
