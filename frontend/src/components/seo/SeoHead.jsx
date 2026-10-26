import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import servicePages from "@/lib/servicePages.json";
import { POSTS } from "@/lib/content";
const staticMeta={
"/": ["Marketing que vira receita | INSALES Marketing","Agência de marketing, mídia paga, SEO, GEO, IA e processos comerciais para gerar crescimento previsível."],
"/servicos":["Serviços de Marketing e Vendas | INSALES","Tráfego pago, SEO, GEO, IA de atendimento, CRM, sites e mais soluções integradas para sua empresa."],
"/metodologia":["Método PRIMA: do clique à receita | INSALES","Conheça os cinco pilares do Método PRIMA: diagnóstico, rastreio até a venda, integração com CRM, indicadores e crescimento com controle."],
"/consultoria-estrategica":["Consultoria Estratégica de Marketing e Vendas | INSALES","Diagnóstico de 60 minutos com análise de mercado, concorrentes, ICP, MQL, SEO, GEO, CRM e plano inicial de ação de 90 dias."],
"/quem-somos":["Quem Somos | INSALES Marketing","Mais de 15 anos no mercado e mais de 2.000 empresas atendidas. Conheça a INSALES."],
"/fale-conosco":["Fale com um Especialista | INSALES","Solicite um diagnóstico de marketing, SEO, performance e vendas com a INSALES."],
"/blog":["Blog sobre Marketing e Vendas | INSALES","Artigos sobre data marketing, SEO, tráfego pago, IA e operações comerciais."]
};
const setMeta=(query,attr,val)=>{let el=document.head.querySelector(query);if(!el){el=document.createElement("meta"); el.setAttribute(attr[0],attr[1]);document.head.appendChild(el);}el.setAttribute("content",val);};
export default function SeoHead(){
 const {pathname}=useLocation();
 const {lang,t}=useLanguage();
 useEffect(()=>{
  const service=servicePages.find(s=>pathname==="/servicos/"+s.slug);
  const post=POSTS.find(p=>pathname==="/blog/"+p.slug);
  const [ptTitle,ptDescription]=service?[service.seo.title,service.seo.description]:post?[post.title+" | INSALES",post.excerpt]:(staticMeta[pathname]||["INSALES Marketing","Estratégia de marketing, inteligência e vendas."]);
  const title=service&&lang!=="pt"?t(service.name)+" | INSALES Marketing":t(ptTitle);
  const description=service&&lang!=="pt"?t(service.description):t(ptDescription);
  document.title=title;
  setMeta('meta[name="description"]',["name","description"],description);
  setMeta('meta[name="robots"]',["name","robots"],pathname.startsWith("/admin")||location.hostname.endsWith(".vercel.app")?"noindex, nofollow":"index, follow");
  let canonical=document.head.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement("link");canonical.rel="canonical";document.head.appendChild(canonical);} canonical.href="https://insales.com.br"+pathname+(pathname==="/"?"/":"");
  setMeta('meta[property="og:title"]',["property","og:title"],title);
  setMeta('meta[property="og:description"]',["property","og:description"],description);
  setMeta('meta[property="og:locale"]',["property","og:locale"],lang==="pt"?"pt_BR":lang==="es"?"es_ES":"en_GB");
 },[pathname,lang,t]);
 return null;
}
