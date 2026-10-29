import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, MaskLine } from "./Reveal";
import { T, useLanguage } from "@/lib/i18n";

const TEXT = "Somos um hub de data marketing focado em aceleração digital e crescimento previsível. Estruturamos dados, integramos canais e decidimos por indicadores — para que cada real investido vire receita.";

const Word = ({ w, range, progress }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">{w}</motion.span>;
};

export const Manifesto = () => {
  const {t} = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = t(TEXT).split(" ");
  return (
    <section ref={ref} data-testid="manifesto-section" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div className="pointer-events-none absolute inset-0 grid-lines [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/10 blur-[120px]" />
      <div className="relative mx-auto max-w-[1400px]">
        <Eyebrow><T>Somos o primeiro</T></Eyebrow>
        <h2 className="font-display mt-6 uppercase leading-[0.92] text-4xl sm:text-6xl lg:text-[5.5rem]">
          <MaskLine><T>Hub</T> <span className="text-[#FFC400]"><T>Data</T></span></MaskLine>
          <MaskLine delay={0.1}><span className="text-[#FFC400]"><T>Marketing</T></span></MaskLine>
          <MaskLine delay={0.2} className="text-outline"><T>do Brasil</T></MaskLine>
        </h2>
        <p data-testid="manifesto-text" className="mt-14 max-w-4xl text-2xl font-semibold leading-snug md:ml-auto md:text-4xl md:leading-[1.2]">
          {words.map((w, i) => (
            <Word key={i} w={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  );
};
