/** @jest-environment node */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/lib/i18n";
import { Nav } from "./Nav";

// Reproduces the incident: before the fix, LanguageSelector called t()
// without obtaining t from useLanguage(). A successful compilation missed it.
describe("INSALES header renders without runtime translation errors", () => {
  test.each(["/", "/servicos", "/metodologia", "/fale-conosco"])("route %s", path => {
    const html = renderToStaticMarkup(
      <LanguageProvider>
        <MemoryRouter initialEntries={[path]}>
          <Nav />
        </MemoryRouter>
      </LanguageProvider>
    );
    expect(html).toContain('data-testid="language-switcher-trigger"');
    expect(html).toContain("Soluções");
    expect(html).toContain("INSALES");
  });
});
