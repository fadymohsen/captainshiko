"use client";

import { createContext, useContext, type ReactNode } from "react";
import { type Locale, translations } from "./translations";

type LangContextType = {
  locale: Locale;
  t: (typeof translations)["en"] | (typeof translations)["ar"];
  dir: "ltr" | "rtl";
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const t = translations[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <LangContext.Provider value={{ locale, t, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
