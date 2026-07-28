// Locale switching + translation lookup. Every user-facing string in every
// feature should be pulled from here — no hardcoded English text inline.

import en from "./locales/en.json";

const locales = { en };

let currentLocale: keyof typeof locales = "en";

export function setLocale(locale: keyof typeof locales) {
  currentLocale = locale;
}

export function t(key: string): string {
  const dict = locales[currentLocale] as Record<string, string>;
  return dict[key] ?? key;
}
