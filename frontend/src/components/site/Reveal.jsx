import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 36, className = "", ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children, className = "" }) => (
  <p className={`font-mono flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-[#FFC400] ${className}`}>
    <span className="h-px w-8 bg-[#FFC400]" />
    {children}
  </p>
);

export const MaskLine = ({ children, delay = 0, className = "" }) => (
  <motion.span initial="hidden" whileInView="show" viewport={{ once: true, amount: 0 }}
    className={`block overflow-hidden pb-[0.06em] ${className}`}>
    <motion.span
      className="block"
      variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
      transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.span>
  </motion.span>
);
