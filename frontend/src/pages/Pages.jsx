import { useEffect } from "react";
import { ServicesGrid } from "@/components/site/Services";
import { Method } from "@/components/site/Method";
import { PrimaDeepDive } from "@/components/site/PrimaDeepDive";
import { Compare } from "@/components/site/Compare";
import { About } from "@/components/site/About";
import { ClientsStrip } from "@/components/site/Marquee";
import { Contact } from "@/components/site/Contact";
import { PageHeader, CtaBand } from "@/components/site/PageHeader";
import { CONTACT } from "@/lib/content";
import { T, useLanguage } from "@/lib/i18n";

const useTitle = (title) => {
  const {t,lang} = useLanguage();
  useEffect(() => { document.title = `${t(title)} | INSALES`; }, [title,lang,t]);
};

export function ServicesPage() {
  useTitle("Serviços");
  return (
    <main data-testid="services-page">
      <PageHeader crumb="Serviços" eyebrow="Nossos serviços" title="Soluções completas para o seu" accent="crescimento."
        text="Um ecossistema único de aquisição, do posicionamento da marca à venda fechada: mídia paga, SEO, IA de atendimento, CRM, conteúdo, sites, e-commerce e materiais comerciais trabalhando juntos." />
      <ServicesGrid />
      <CtaBand />
    </main>
  );
}

export function MethodPage() {
  useTitle("Metodologia");
  return (
    <main data-testid="method-page" className="pt-16">
      <Method interactive />
      <PrimaDeepDive />
      <Compare />
      <CtaBand />
    </main>
  );
}

export function AboutPage() {
  const {t} = useLanguage();
  useTitle(t("Quem Somos"));
  return (
    <main data-testid="about-page">
      <PageHeader crumb={t("Quem Somos")} eyebrow={t("Quem Somos")} title={t("Hub de Data Marketing")} accent={t("e Vendas.")}
        text={t("Somos um hub de data marketing focado em aceleração digital e crescimento previsível. Estruturamos dados, integramos canais e decidimos por indicadores.")} />
      <section data-testid="who-we-are-manifesto" className="px-5 pb-16 md:px-10">
        <div className="mx-auto max-w-[1400px] rounded-3xl border border-[#FFC400]/25 bg-[#111316] px-7 py-10 md:px-12 md:py-14">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[#FFC400]"><T>Nosso compromisso</T></p>
          <h2 className="font-display mt-5 text-4xl uppercase leading-[1] sm:text-5xl md:text-6xl">
            <T>Vivemos o que</T> <span className="text-[#FFC400]"><T>vendemos.</T></span>
          </h2>
        </div>
      </section>
      <About />
      <ClientsStrip />
      <CtaBand />
    </main>
  );
}

export function ContactPage() {
  useTitle("Fale Conosco");
  return (
    <main data-testid="contact-page" className="pt-16">
      <Contact />
      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-3xl border border-white/10">
          <iframe
            title="Mapa INSALES"
            data-testid="contact-map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&z=16&output=embed`}
            className="h-[360px] w-full grayscale invert-[0.9] hue-rotate-180 md:h-[440px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
