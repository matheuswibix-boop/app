import { Link } from "react-router-dom";
import { ArrowUpRight, BarChart3, SearchCheck, UsersRound, Clock3 } from "lucide-react";
import { Eyebrow, MaskLine, Reveal } from "./Reveal";
import { T } from "@/lib/i18n";

const subjects = [
 {icon:SearchCheck,title:"Mercado e demanda",text:"Concorrentes, volume de buscas, palavras-chave de maior intenção de compra, posicionamento regional e presença no Google e nas IAs."},
 {icon:UsersRound,title:"Cliente e jornada",text:"Perfil de cliente ideal (ICP), critérios de MQL, objeções, jornada de compra e oportunidades para atrair pessoas mais qualificadas."},
 {icon:BarChart3,title:"Vendas e indicadores",text:"CRM, velocidade de atendimento, taxas de conversão, ticket médio e ligação entre investimentos e vendas."}
];
export const StrategicConsulting=()=>(
 <section id="consultoria-estrategica" data-testid="strategic-consulting-home" className="relative overflow-hidden border-y border-[#FFC400]/15 bg-[#0b0c0e] px-5 py-24 md:px-10 md:py-32">
  <div className="pointer-events-none absolute inset-0 grid-lines [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"/>
  <div className="pointer-events-none absolute -right-48 -top-40 h-[600px] w-[600px] rounded-full bg-[#FFC400]/10 blur-[130px]"/>
  <div className="relative mx-auto max-w-[1400px]">
   <div className="grid items-end gap-9 lg:grid-cols-[1.45fr_.55fr]">
    <div><Eyebrow><T>Consultoria estratégica inicial</T></Eyebrow>
     <h2 className="font-display mt-6 max-w-5xl uppercase leading-[0.96] text-4xl sm:text-5xl lg:text-6xl"><MaskLine><T>Antes de investir,</T></MaskLine><MaskLine delay={0.12}><span className="text-[#FFC400]"><T>entenda onde crescer.</T></span></MaskLine></h2>
     <Reveal><p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#c2c4c9]"><T>Em uma conversa de aproximadamente uma hora, mergulhamos no seu setor, analisamos a demanda e os gargalos de marketing e vendas e construímos um plano inicial com prioridades para 90 dias. Não recomendamos campanhas sem entender o seu negócio.</T></p></Reveal>
    </div>
    <Reveal delay={0.15}><div className="flex items-center gap-5 rounded-3xl border border-[#FFC400]/35 bg-[#111316] p-7"><Clock3 className="h-10 w-10 shrink-0 text-[#FFC400]"/><div><span className="font-display block text-5xl text-[#FFC400]">60 MIN</span><p className="mt-1 text-sm text-[#c2c4c9]"><T>de conversa estratégica com especialistas</T></p></div></div></Reveal>
   </div>
   <div className="mt-12 grid gap-4 md:grid-cols-3">{subjects.map(({icon:Icon,title,text},i)=><Reveal key={title} delay={i*.08} className="h-full"><article className="h-full rounded-3xl border border-white/10 bg-[#111316] p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-[#FFC400]/50"><Icon className="h-8 w-8 text-[#FFC400]"/><h3 className="font-display mt-7 text-2xl uppercase"><T>{title}</T></h3><p className="mt-4 leading-relaxed text-[#c2c4c9]"><T>{text}</T></p></article></Reveal>)}</div>
   <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#FFC400]/30 bg-[#111316] p-7 md:flex-row md:items-center md:p-9">
    <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFC400]"><T>O que você leva da conversa</T></p><p className="mt-2 max-w-3xl text-lg font-semibold"><T>Oportunidades reais, indicadores prioritários e um plano inicial de ação para os próximos 90 dias.</T></p></div>
    <Link to="/consultoria-estrategica" data-testid="consulting-cta-home" className="group inline-flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold text-[#070809] transition-transform hover:-translate-y-1"><T>Conhecer a consultoria</T> <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45"/></Link>
   </Reveal>
  </div>
 </section>
);
