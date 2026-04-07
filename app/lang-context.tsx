"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { type Locale, translations } from "./translations";

type TranslationType = {
  nav: { about: string; services: string; programs: string; contact: string; signUp: string };
  hero: { badge: string; title1: string; title2: string; title3: string; desc: string; cta: string; programs: string; statsYears: string; statsClients: string; statsPrograms: string };
  banner: readonly string[];
  about: { label: string; title1: string; title2: string; desc: string; cta: string; card1: string; card2: string };
  services: { label: string; title: string; items: readonly { title: string; desc: string }[] };
  coach: { label: string; title: string; members: readonly { name: string; role: string }[] };
  pricing: { label: string; title: string; popular: string; cta: string; plans: readonly { tier: string; price: string; period: string; features: readonly string[] }[] };
  cta: { label: string; title1: string; title2: string; desc: string; button: string };
  footer: { rights: string };
};

type LangContextType = {
  locale: Locale;
  t: TranslationType;
  toggle: () => void;
  dir: "ltr" | "rtl";
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";

  function toggle() {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  }

  return (
    <LangContext.Provider value={{ locale, t, toggle, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
