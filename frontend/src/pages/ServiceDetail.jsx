import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import { PageHeader, CtaBand } from "@/components/site/PageHeader";
import { Eyebrow, Reveal } from "@/components/site/Reveal";
import { T, useLanguage } from "@/lib/i18n";
import servicePages from "@/lib/servicePages.json";
const bySlug = Object.fromEntries(servicePages.map(s => [s.slug,s]));
export default function ServiceDetail() {
  const { slug } = useParams();
  const {lang,t} = useLanguage();
  const original = bySlug[slug];
  const localized = s => s && ({ ...s, name:t(s.name), tag:t(s.tag), description:t(s.description), deliverables:s.deliverables.map(t), metrics:t(s.metrics) });
  const service = localized(original);
  if (!service) return <main className="min-h-screen px-5 pt-40 text-center"><h1 className="font-display text-4xl uppercase"><T>Serviço não encontrado</T></h1><Link to="/servicos" className="mt-8 inline-block text-[#FFC400]"><T>Ver todos os serviços</T></Link></main>;
  const related=servicePages.filter(s=>s.slug!==slug).slice(0,3).map(localized);
  const inquiry=lang==="es"?"¡Hola! Quiero un diagnóstico sobre "+service.name+" en INSALES.":lang==="en"?"Hello! I would like an assessment of "+service.name+" at INSALES.":"Olá! Quero um diagnóstico sobre "+service.name+" na INSALES.";
  const whatsapp="https://wa.me/5541996617279?text="+encodeURIComponent(inquiry);
  return <main data-testid={"service-detail-"+slug}>
    <PageHeader crumb={service.name} eyebrow={service.tag} title={service.name} accent={t("que gera receita.")} text={service.description}/>
    <section className="px-5 pb-20 md:px-10"><div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <Reveal className="rounded-3xl border border-white/10 bg-[#111316] p-7 md:p-12">
        <Eyebrow><T>Estratégia INSALES</T></Eyebrow>
        <h2 className="font-display mt-6 text-3xl uppercase leading-tight md:text-5xl"><T>Do diagnóstico à</T> <span className="text-[#FFC400]"><T>execução.</T></span></h2>
        <p className="mt-6 text-[#c2c4c9] leading-relaxed">{service.description} Trabalhamos com plano documentado, integração de canais e leitura contínua dos resultados.</p>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FFC400] px-7 py-4 font-bold text-[#070809] transition-transform hover:-translate-y-1"><T>Solicitar diagnóstico</T> <ArrowUpRight className="h-4 w-4"/></a>
      </Reveal>
      <Reveal className="rounded-3xl border border-white/10 bg-[#111316] p-7 md:p-12">
        <Eyebrow><T>Principais entregas</T></Eyebrow>
        <ul className="mt-6 space-y-6">{service.deliverables.map(item=><li className="flex items-start gap-3" key={item}><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#FFC400]"/><span className="text-[#e7e8e9]">{item}</span></li>)}</ul>
        <div className="mt-10 border-t border-white/10 pt-7"><h3 className="font-display text-xl uppercase"><T>Indicadores relevantes</T></h3><p className="mt-3 text-sm leading-relaxed text-[#c2c4c9]">{service.metrics}</p></div>
      </Reveal>
    </div></section>
    <section className="px-5 pb-24 md:px-10"><div className="mx-auto max-w-[1400px]">
      <Eyebrow><T>Perguntas frequentes</T></Eyebrow><h2 className="font-display mt-5 text-3xl uppercase md:text-5xl"><T>Entenda a</T> <span className="text-[#FFC400]"><T>solução.</T></span></h2>
      <div className="mt-9 grid gap-3">{original.faq.map((item,i)=><details key={item.question} className="group rounded-2xl border border-white/10 bg-[#111316] p-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{lang==="pt"?item.question: i===0?(lang==="es"?"¿Qué es ":"What is ")+service.name+"?":i===1?(lang==="es"?"¿Qué incluye el servicio de ":"What is included in ")+service.name+"?":(lang==="es"?"¿Cómo se miden los resultados de ":"How are results measured for ")+service.name+"?"}<ChevronDown className="h-5 w-5 shrink-0 text-[#FFC400] transition-transform group-open:rotate-180"/></summary><p className="mt-4 max-w-4xl leading-relaxed text-[#c2c4c9]">{lang==="pt"?item.answer:i===0?service.description:i===1?(lang==="es"?"La estrategia se define tras el diagnóstico y puede incluir: ":"The strategy is defined during the assessment and may include: ")+service.deliverables.join("; ")+". "+(lang==="es"?"El alcance contratado determina las entregas específicas.":"The agreed scope defines the specific deliverables."):(lang==="es"?"Entre los indicadores principales se encuentran: ":"Key metrics include: ")+service.metrics+" "+(lang==="es"?"El seguimiento depende de los canales e integraciones disponibles.":"Tracking depends on available channels and integrations.")}</p></details>)}</div>
    </div></section>
    <section className="px-5 pb-24 md:px-10"><div className="mx-auto max-w-[1400px]"><Eyebrow><T>Conheça também</T></Eyebrow><div className="mt-7 grid gap-4 md:grid-cols-3">{related.map(s=><Link to={"/servicos/"+s.slug} key={s.slug} className="group rounded-3xl border border-white/10 bg-[#111316] p-7 transition-colors hover:border-[#FFC400]/60"><span className="font-mono text-xs uppercase text-[#FFC400]">{s.tag}</span><h3 className="font-display mt-4 text-2xl uppercase">{s.name}</h3><span className="mt-6 inline-flex items-center gap-2 text-sm text-[#c2c4c9] group-hover:text-[#FFC400]"><T>Conhecer serviço</T> <ChevronRight className="h-4 w-4"/></span></Link>)}</div></div></section>
    <CtaBand/>
  </main>
}
