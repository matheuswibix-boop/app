import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "@/lib/i18n";
import { ContactForm7 } from "./ContactForm7";

let root;
let container;
let source;

beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  source = document.createElement("div");
  source.id = "insales-cf7-source";
  source.hidden = true;
  source.innerHTML = '<div class="wpcf7" id="wpcf7-f123-o1"><form class="wpcf7-form"><input type="hidden" name="_wpcf7" value="123"><input name="your-name" value=""><button type="submit">Enviar</button></form></div>';
  document.body.appendChild(source);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  document.body.replaceChildren();
  delete window.wpcf7;
  delete global.IS_REACT_ACT_ENVIRONMENT;
});

function renderForm() {
  act(() => root.render(
    <React.StrictMode><LanguageProvider><ContactForm7 /></LanguageProvider></React.StrictMode>
  ));
}

test("mounts the original CF7 DOM once without nesting forms or reinitializing the plugin", () => {
  const original = source.firstElementChild;
  const form = original.querySelector("form");
  const onSubmit = jest.fn(event => event.preventDefault());
  form.addEventListener("submit", onSubmit);
  window.wpcf7 = { init: jest.fn() };

  renderForm();

  expect(container.querySelector("#formulario .wpcf7")).toBe(original);
  expect(document.querySelectorAll(".wpcf7")).toHaveLength(1);
  expect(container.querySelectorAll("form")).toHaveLength(1);
  expect(container.querySelector("form form")).toBeNull();
  expect(container.querySelector('[name="_wpcf7"]').value).toBe("123");
  expect(source.children).toHaveLength(0);
  expect(window.wpcf7.init).not.toHaveBeenCalled();
  act(() => form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  expect(onSubmit).toHaveBeenCalledTimes(1);
});

test("keeps the same form and values when navigating away and back", () => {
  const original = source.firstElementChild;
  const input = original.querySelector('[name="your-name"]');
  renderForm();
  input.value = "Cliente de teste";
  act(() => root.render(null));
  expect(source.firstElementChild).toBe(original);
  expect(input.value).toBe("Cliente de teste");
  renderForm();
  expect(container.querySelector(".wpcf7")).toBe(original);
  expect(container.querySelector('[name="your-name"]').value).toBe("Cliente de teste");
  expect(document.querySelectorAll(".wpcf7")).toHaveLength(1);
});

test("shows a phone contact if the existing plugin or form is unavailable", () => {
  source.remove();
  renderForm();
  expect(container.querySelector("form")).toBeNull();
  expect(container.querySelector('[role="status"]')).not.toBeNull();
  expect(container.querySelector('a[href="tel:+5541996617279"]')).not.toBeNull();
});
