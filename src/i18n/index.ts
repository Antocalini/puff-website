import { en } from "./en";
import { es } from "./es";

export const defaultLocale = "en" as const;
export const supportedLocales = ["en", "es"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const translations = {
  en,
  es,
} as const;

export function getTranslations(locale?: string | null): typeof en {
  if (locale === "es") {
    return es;
  }
  return en;
}

export function getLocaleFromUrl(url: URL): SupportedLocale {
  const [, lang] = url.pathname.split("/");
  if (lang === "es") return "es";
  return "en";
}

export function getRelativeLocaleUrl(locale: SupportedLocale, path: string = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === "es") {
    return `/es${cleanPath === "/" ? "/" : cleanPath}`;
  }
  return cleanPath;
}
