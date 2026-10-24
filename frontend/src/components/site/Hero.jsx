import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, MessageSquare, Play } from "lucide-react";
import { STATS } from "@/lib/content";
import { Counter } from "./Counter";
import { useGoTo } from "./Nav";

const ease = [0.76, 0, 0.24, 1];
const lines = [
  { t: "Marketing", c: "text-[#F7F8F8]" },
  { t: "que vira", c: "text-[#F7F8F8]" },
  { t: "receita.", c: "text-[#FFC400]" },
];

const HeroImage = ({ y }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 80, damping: 20 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <div onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="absolute inset-0 lg:left-[38%] [perspective:1400px]">
      <motion.div style={{ y, rotateX: rx, rotateY: ry }} className="absolute inset-0 origin-center will-change-transform">
        <motion.img
          src="/img/predio.webp" alt="Sede do Grupo GGV em Curitiba ao pôr do sol"
          data-testid="hero-image"
          initial={{ clipPath: "inset(0 0 0 100%)", scale: 1.25 }}
          animate={{ clipPath: "inset(0 0 0 0%)", scale: 1.08 }}
          transition={{ duration: 1.6, ease, delay: 0.2 }}
          className="h-full w-full object-cover object-[60%_50%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#070809] via-[#070809]/70 to-transparent lg:via-[#070809]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-transparent to-[#070809]/40" />
    </div>
  );
};

export const Hero = () => {
  const ref = useRef(null);
  const goTo = useGoTo();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative min-h-[100svh] overflow-hidden">
      <HeroImage y={y} />
      <motion.div style={{ y: textY }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pb-12 pt-32 md:px-10 md:pb-16">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="font-mono mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#FFC400]">
          <span className="h-2 w-2 rounded-full bg-[#FFC400] animate-pulse" /> Hub de Marketing e Vendas — Brasil
        </motion.p>
        <h1 data-testid="hero-title" className="font-display uppercase leading-[0.9] text-[10.5vw] sm:text-6xl lg:text-7xl xl:text-[6.4rem]">
          {lines.map((l, i) => (
            <span key={l.t} className="block overflow-hidden pb-[0.04em]">
              <motion.span className={`block ${l.c}`} initial={{ y: "115%" }} animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease, delay: 0.45 + i * 0.13 }}>{l.t}</motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 max-w-xl">
          <p className="text-base md:text-lg text-[#c9cbd0] leading-relaxed">
            Conectamos estratégia, tecnologia e performance de pessoas para gerar resultados mensuráveis — integrando marketing, inteligência artificial, automação e vendas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button data-testid="hero-cta-primary" onClick={() => goTo("contato")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#FFC400] px-6 py-3.5 text-sm font-bold text-[#070809] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(255,196,0,0.7)]">
              <MessageSquare className="h-4 w-4" /> Quero impulsionar minha receita
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button data-testid="hero-cta-cases" onClick={() => goTo("cases")}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#FFC400] hover:text-[#FFC400]">
              Conheça os cases <Play className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}
          className="mt-14 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 md:max-w-3xl">
          {STATS.map((s, i) => (
            <div key={s.label} data-testid={`hero-stat-${i}`} className={i ? "border-l border-white/10 pl-4" : ""}>
              <Counter to={s.n} pre={s.pre} suf={s.suf} className="font-display block text-2xl sm:text-3xl md:text-4xl text-[#FFC400]" />
              <span className="mt-1 block text-xs sm:text-sm text-[#c9cbd0]">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
