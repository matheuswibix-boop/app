import { WORD_PATH, MARK_PATH } from "@/assets/logoPaths";

export const Logo = ({ className = "h-8 md:h-9" }) => (
  <svg viewBox="0 0 1670 285" className={`w-auto ${className}`} role="img" aria-label="INSALES Marketing">
    <path fillRule="evenodd" fill="#F7F8F8" d={WORD_PATH} />
    <path fillRule="evenodd" fill="#FFC400" d={MARK_PATH} />
  </svg>
);
