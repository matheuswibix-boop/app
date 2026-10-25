import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Eyebrow, MaskLine, Reveal } from "./Reveal";

export const PageHeader = ({ eyebrow, title, accent, text, crumb }) => (
  <section data-testid="page-header" className="relative overflow-hidden px-5 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
    <div className="pointer-events-none absolute inset-0 grid-lines [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" />
    <div className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#FFC400]/10 blur-[120px]" />
    <div className="relative mx-auto max-w-[1400px]">
      <nav aria-label="breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-[#AEB0B6]">
        <Link to="/" data-testid="breadcrumb-home" className="hover:text-[#FFC400]">Início</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white">{crumb}</span>
      </nav>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 data-testid="page-title" className="font-display mt-6 max-w-5xl uppercase leading-[1] text-4xl sm:text-5xl lg:text-6xl">
        <MaskLine>{title} {accent && <span className="text-[#FFC400]">{accent}</span>}</MaskLine>
      </h1>
      {text && <Reveal><p className="mt-6 max-w-2xl text-base text-[#c2c4c9] leading-relaxed md:text-lg">{text}</p></Reveal>}
    </div>
  </section>
);

export const CtaBand = () => (
  <section className="px-5 pb-24 md:px-10">
    <Reveal>
      <Link to="/fale-conosco" data-testid="cta-band"
        className="group mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 rounded-3xl bg-[#FFC400] p-8 text-[#070809] transition-transform duration-500 hover:-translate-y-1 md:flex-row md:items-center md:p-12">
        <span className="font-display max-w-2xl text-2xl uppercase leading-[1.05] md:text-4xl">Pronto para escalar seus resultados?</span>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#070809] px-6 py-3.5 text-sm font-bold text-[#FFC400]">
          Fale com Especialista <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </Link>
    </Reveal>
  </section>
);
