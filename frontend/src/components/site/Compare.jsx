import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { COMPARE } from "@/lib/content";
import { Eyebrow, MaskLine } from "./Reveal";

export const Compare = () => {
  const [on, setOn] = useState(true);
  return (
    <section data-testid="compare-section" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Eyebrow>O que muda</Eyebrow>
          <h2 className="font-display mt-6 uppercase leading-[0.95] text-4xl sm:text-5xl">
            <MaskLine>Do tráfego isolado</MaskLine>
            <MaskLine delay={0.1}>à <span className="text-[#FFC400]">soberania digital.</span></MaskLine>
          </h2>
          <div role="tablist" className="mt-10 inline-flex rounded-full border border-white/15 p-1">
            {[["Quebrado", false], ["Integrado", true]].map(([l, v]) => (
              <button key={l} role="tab" aria-selected={on === v} data-testid={`compare-toggle-${l.toLowerCase()}`} onClick={() => setOn(v)}
                className="relative rounded-full px-6 py-2.5 text-sm font-bold">
                {on === v && <motion.span layoutId="cmp" className={`absolute inset-0 rounded-full ${v ? "bg-[#FFC400]" : "bg-white/15"}`} transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className={`relative ${on === v && v ? "text-[#070809]" : "text-white"}`}>Marketing {l.toLowerCase()}</span>
              </button>
            ))}
          </div>
        </div>
        <ul data-testid="compare-list" className="divide-y divide-white/10 border-y border-white/10">
          {COMPARE.map(([bad, good], i) => (
            <li key={i} className="flex items-center gap-5 py-5">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-500 ${on ? "bg-[#FFC400] text-[#070809]" : "bg-white/10 text-[#AEB0B6]"}`}>
                {on ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </span>
              <motion.span key={`${on}-${i}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className={`text-lg md:text-xl font-semibold ${on ? "text-white" : "text-[#AEB0B6] line-through decoration-white/30"}`}>
                {on ? good : bad}
              </motion.span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
