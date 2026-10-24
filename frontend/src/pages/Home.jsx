import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/site/Hero";
import { Manifesto } from "@/components/site/Manifesto";
import { EditorialMarquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Method } from "@/components/site/Method";
import { Compare } from "@/components/site/Compare";
import { Cases } from "@/components/site/Cases";
import { About } from "@/components/site/About";
import { BlogPreview } from "@/components/site/BlogPreview";
import { Contact } from "@/components/site/Contact";
import { scrollToId } from "@/lib/scroll";

export default function Home() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => scrollToId(hash.slice(1)), 300);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <main data-testid="home-page">
      <Hero />
      <Manifesto />
      <EditorialMarquee />
      <Services />
      <Method />
      <Compare />
      <Cases />
      <About />
      <BlogPreview />
      <Contact />
    </main>
  );
}
