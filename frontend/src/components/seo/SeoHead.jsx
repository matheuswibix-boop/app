import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { serviceLocaleCopy } from "@/lib/serviceLocaleCopy";
import servicePages from "@/lib/servicePages.json";
import { POSTS } from "@/lib/content";

const staticMeta = {
  "/": ["Marketing que vira receita | INSALES Marketing", "Agência de marketing, mídia paga, SEO, GEO, IA e processos comerciais para gerar crescimento previsível."],
  "/servicos": ["Soluções de Marketing e Vendas | INSALES", "Tráfego pago, SEO, GEO, IA de atendimento, CRM, sites e mais soluções integradas para sua empresa."],
  "/metodologia": ["Método PRIMA: do clique à receita | INSALES", "Conheça os cinco pilares do Método PRIMA: diagnóstico, rastreio até a venda, integração com CRM, indicadores e crescimento com controle."],
  "/consultoria-estrategica": ["Consultoria Estratégica de Marketing e Vendas | INSALES", "Diagnóstico de 60 minutos com análise de mercado, concorrentes, ICP, MQL, SEO, GEO, CRM e plano inicial de ação de 90 dias."],
  "/quem-somos": ["Quem Somos | INSALES Marketing", "Mais de 15 anos no mercado e mais de 2.000 empresas atendidas. Conheça a INSALES."],
  "/fale-conosco": ["Fale com um Especialista | INSALES", "Solicite um diagnóstico de marketing, SEO, performance e vendas com a INSALES."],
  "/blog": ["Blog sobre Marketing e Vendas | INSALES", "Artigos sobre data marketing, SEO, tráfego pago, IA e operações comerciais."]
};
const base = "https://insales.com.br";
function uniqueHead(selector, create) {
  const matches = [...document.head.querySelectorAll(selector)];
  const element = matches[0] || create();
  matches.slice(1).forEach(extra => extra.remove());
  if (!element.parentNode) document.head.appendChild(element);
  return element;
}
function meta(selector, attr, key, content) {
  const el = uniqueHead(selector, () => {
    const node = document.createElement("meta");
    node.setAttribute(attr, key);
    return node;
  });
  el.setAttribute("content", content);
}
function link(selector, rel, href, hreflang) {
  const el = uniqueHead(selector, () => {
    const node = document.createElement("link");
    node.setAttribute("rel", rel);
    if (hreflang) node.setAttribute("hreflang", hreflang);
    return node;
  });
  el.setAttribute("href", href);
}
export default function SeoHead() {
  const { pathname } = useLocation();
  const { lang, t } = useLanguage();
  useEffect(() => {
    const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const service = servicePages.find(s => normalizedPath === "/servicos/" + s.slug);
    const post = POSTS.find(p => normalizedPath === "/blog/" + p.slug);
    const [fallbackTitle, fallbackDescription] = staticMeta[normalizedPath] || ["INSALES Marketing", "Estratégia de marketing, inteligência e vendas."];
    const editorial = service && lang !== "pt" ? serviceLocaleCopy[service.slug]?.[lang] : null;
    const title = service ? (editorial?.title || (lang === "pt" ? service.seo.title : t(service.name) + " | INSALES Marketing"))
      : post ? t(post.title) + " | INSALES"
      : t(fallbackTitle);
    const description = service ? (lang === "pt" ? service.seo.description : t(service.description))
      : post ? t(post.excerpt)
      : t(fallbackDescription);
    document.title = title;
    meta('meta[name="description"]', "name", "description", description);
    const preview = window.location.hostname.endsWith(".vercel.app") || normalizedPath.startsWith("/admin");
    meta('meta[name="robots"]', "name", "robots", preview ? "noindex, nofollow" : "index, follow");
    const canonicalBase = base + normalizedPath;
    const self = lang === "pt" ? canonicalBase : canonicalBase + "?lang=" + lang;
    link('link[rel="canonical"]', "canonical", self);
    for (const [code, suffix] of [["pt-BR", ""], ["es", "?lang=es"], ["en-US", "?lang=en"], ["x-default", ""]]) {
      link('link[rel="alternate"][hreflang="' + code + '"]', "alternate", canonicalBase + suffix, code);
    }
    meta('meta[property="og:title"]', "property", "og:title", title);
    meta('meta[property="og:description"]', "property", "og:description", description);
    meta('meta[property="og:locale"]', "property", "og:locale", lang === "pt" ? "pt_BR" : lang === "es" ? "es_ES" : "en_US");
    meta('meta[property="og:url"]', "property", "og:url", self);
    meta('meta[property="og:type"]', "property", "og:type", post ? "article" : "website");
  }, [pathname, lang, t]);
  return null;
}
