import { MapPin, Navigation } from "lucide-react";
import { CONTACT } from "@/lib/content";
import { Eyebrow, Reveal } from "./Reveal";
import { T } from "@/lib/i18n";

// Reuses the same validated embed already displayed on /fale-conosco.
export function HomeMap() {
  return <section id="localizacao" data-testid="home-google-map" className="bg-[#0b0c0e] px-5 py-20 md:px-10 md:py-28">
    <div className="mx-auto max-w-[1400px]">
      <Reveal className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow><T>Onde estamos</T></Eyebrow>
          <h2 className="font-display mt-5 text-4xl uppercase leading-none sm:text-5xl"><T>Visite nossa</T> <span className="text-[#FFC400]"><T>localização.</T></span></h2>
          <p className="mt-4 flex items-center gap-2 text-sm leading-relaxed text-[#c2c4c9]"><MapPin className="h-4 w-4 shrink-0 text-[#FFC400]"/>{CONTACT.address}</p>
        </div>
        <a href={CONTACT.maps} target="_blank" rel="noopener noreferrer" data-testid="home-map-directions"
          className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/70 px-5 py-3 text-sm font-bold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-[#070809]"><Navigation className="h-4 w-4"/><T>Ver rota no Google Maps</T></a>
      </Reveal>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111316]">
        <iframe title="Localização INSALES no Google Maps" data-testid="home-map-embed"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&z=16&output=embed`}
          className="h-[330px] w-full grayscale invert-[0.9] hue-rotate-180 md:h-[440px]"
          loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
      </div>
    </div>
  </section>;
}
