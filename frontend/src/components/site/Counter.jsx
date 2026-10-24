import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

export const Counter = ({ to, pre = "", suf = "", className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [val, setVal] = useState(to);

  useEffect(() => {
    if (!inView) return undefined;
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {pre}{val.toLocaleString("pt-BR")}{suf}
    </span>
  );
};
