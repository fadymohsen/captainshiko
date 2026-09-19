"use client";

import { createContext, useContext, type ReactNode, useState, useEffect } from "react";
import { type Locale, translations } from "./translations";

export type Region = "egypt" | "abroad";

type LangContextType = {
  locale: Locale;
  t: (typeof translations)["en"] | (typeof translations)["ar"];
  dir: "ltr" | "rtl";
  region: Region;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({
  locale,
  initialRegion,
  children,
}: {
  locale: Locale;
  initialRegion?: Region;
  children: ReactNode;
}) {
  const t = translations[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";

  // Prefer the region resolved server-side (from Vercel's geo headers) so the
  // first paint already shows the right currency. Fall back to "abroad" only
  // when the server couldn't determine it (e.g. local dev / non-Vercel host).
  const [region, setRegion] = useState<Region>(initialRegion ?? "abroad");

  useEffect(() => {
    // Server already resolved the region from request headers — no need to
    // re-check on the client.
    if (initialRegion) return;

    async function detectRegion() {
      try {
        const response = await fetch("/api/geography", {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Local geo check failed");

        const data = await response.json();
        console.log(`Region detected: ${data.region} (Source: ${data.source}, Country: ${data.country})`);

        if (data.region === "egypt") {
          setRegion("egypt");
        } else {
          setRegion("abroad");
        }
      } catch (error) {
        console.error("Region detection error:", error);
        // Default to abroad for global safety
        setRegion("abroad");
      }
    }

    detectRegion();
  }, [initialRegion]);

  return (
    <LangContext.Provider value={{ locale, t, dir, region }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
