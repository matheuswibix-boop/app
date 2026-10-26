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

const useTitle = (t) => {
  useEffect(() => { document.title = `${t} | INSALES`; }, [t]);
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
      <Method />
      <PrimaDeepDive />
      <Compare />
      <CtaBand />
    </main>
  );
}

export function AboutPage() {
  useTitle("Quem Somos");
  return (
    <main data-testid="about-page">
      <PageHeader crumb="Quem Somos" eyebrow="Quem somos" title="Hub de Data Marketing" accent="e Vendas."
        text="Somos um hub de data marketing focado em aceleração digital e crescimento previsível. Estruturamos dados, integramos canais e decidimos por indicadores." />
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
