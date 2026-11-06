import { useEffect, useRef, useState } from "react";
import { T } from "@/lib/i18n";

// PHP renders the existing CF7 form outside the React root before wp_head().
// Move the same DOM node to preserve the site's configured CF7 integration.
export function ContactForm7() {
  const mount = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const source = document.getElementById("insales-cf7-source");
    const nativeForm = source?.querySelector(".wpcf7");
    if (!nativeForm || !mount.current) return undefined;

    mount.current.appendChild(nativeForm);
    setMounted(true);

    // CF7 initializes this server-rendered node on DOMContentLoaded wherever
    // it is mounted. Do not call wpcf7.init again or clone a second form.
    return () => {
      source.appendChild(nativeForm);
    };
  }, []);

  return (
    <div id="formulario" data-testid="contact-form-7-host" className="scroll-mt-28">
      <div ref={mount} />
      {!mounted && (
        <p role="status" className="rounded-3xl border border-white/10 bg-[#111316] p-6 text-sm text-[#c2c4c9]">
          <T>Formulário indisponível no momento.</T>{" "}
          <a href="tel:+5541996617279" className="text-[#25D366] underline">
            (41) 99661-7279
          </a>
        </p>
      )}
    </div>
  );
}
