export const LogoMark = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="9" fill="#FFC400" />
    <path d="M10 38V12l13 11 11-11h-8V7h16v16h-5v-8L23 30l-8-7v15z" fill="#070809" />
  </svg>
);

export const Logo = ({ className = "" }) => (
  <span className={`flex items-center gap-2.5 ${className}`}>
    <LogoMark />
    <span className="leading-none">
      <span className="font-display block text-[1.15rem] tracking-tight text-[#F7F8F8]">INSALES</span>
      <span className="block text-[0.55rem] font-bold uppercase tracking-[0.28em] text-[#AEB0B6] mt-1">Marketing e Vendas</span>
    </span>
  </span>
);
