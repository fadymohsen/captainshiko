"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { type Locale, translations } from "./translations";

type LangContextType = {
  locale: Locale;
  t: (typeof translations)["en"] | (typeof translations)["ar"];
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
