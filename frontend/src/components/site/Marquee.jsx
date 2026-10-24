const WORDS = ["Dados", "Estratégia", "Tecnologia", "Pessoas", "Receita"];

export const EditorialMarquee = () => {
  const row = [...WORDS, ...WORDS];
  return (
    <div data-testid="editorial-marquee" className="relative overflow-hidden border-y border-white/10 bg-[#070809] py-6 md:py-10">
      <div className="marquee-track flex items-center" style={{ "--dur": "70s" }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center" aria-hidden={k === 1}>
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className={`font-display uppercase text-6xl md:text-[8rem] leading-none px-6 md:px-10 ${i % 2 ? "text-outline" : "text-[#F7F8F8]"}`}>{w}</span>
                <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-14 md:w-14 shrink-0 fill-[#FFC400]"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" /></svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

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
