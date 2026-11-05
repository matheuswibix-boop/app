/** @jest-environment node */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LanguageProvider } from "@/lib/i18n";
import { Nav } from "./Nav";

// Isolated React Router mocks: CRA's Jest 27 cannot resolve the React Router 7
// react-router/dom entrypoint although the production webpack build can.
jest.mock("react-router-dom", () => {
  const React = require("react");
  const Link = ({to, children, ...props}) =>
    React.createElement("a", {href:to,...props}, children);
  const NavLink = ({to, children, ...props}) =>
    React.createElement("a", {href:to,...props},
      typeof children === "function" ? children({isActive:to==="/"}) : children);
  return {Link,NavLink,useLocation:() => ({pathname:"/"})};
});

// Regression: a missing useLanguage().t in LanguageSelector previously crashed
// every page with "Uncaught ReferenceError: t is not defined".
test("INSALES header including language selector server-renders without exceptions", () => {
  const html = renderToStaticMarkup(
    <LanguageProvider><Nav /></LanguageProvider>
  );
  expect(html).toContain('data-testid="language-switcher-trigger"');
  expect(html).toContain("Soluções");
  expect(html).toContain("INSALES");
});
