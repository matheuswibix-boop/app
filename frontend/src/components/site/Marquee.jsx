import { CLIENTS } from "@/lib/content";

export const LogoMarquee = ({ logos }) => (
  <div data-testid="clients-marquee" className="marquee-wrap relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
    <div className="marquee-track pausable flex gap-4" style={{ "--dur": "80s" }}>
      {[...logos, ...logos].map((l, i) => (
        <div key={i} aria-hidden={i >= logos.length}
          className="group grid h-24 w-44 shrink-0 place-items-center rounded-2xl bg-[#F7F8F8] px-6 md:h-28 md:w-52">
          <img src={`/img/logos/${l}.webp`} alt={l.replace(/_/g, " ")} loading="lazy"
            className="max-h-14 max-w-full object-contain grayscale opacity-80 transition-[filter,opacity] duration-500 group-hover:grayscale-0 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  </div>
);

export const ClientsStrip = () => (
  <section data-testid="clients-section" className="py-20 md:py-24">
    <p className="font-mono mb-6 px-5 text-center text-xs uppercase tracking-[0.28em] text-[#AEB0B6]"><T>Empresas que confiam</T></p>
    <LogoMarquee logos={CLIENTS} />
  </section>
);
