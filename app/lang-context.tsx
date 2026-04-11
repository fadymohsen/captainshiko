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
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const t = translations[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";
  
  // Default to abroad (USD) for global safety
  const [region, setRegion] = useState<Region>("abroad");

  useEffect(() => {
    async function detectRegion() {
      try {
        // Use GeoJS as it's often more reliable and faster for global detection
        // Adding a timestamp to bust any cache
        const response = await fetch(`https://get.geojs.io/v1/ip/geo.json?t=${Date.now()}`, {
          cache: "no-store",
          headers: { "Accept": "application/json" }
        });
        
        if (!response.ok) throw new Error("Geo detection failed");
        
        const data = await response.json();
        
        // Console log for debugging in production (temporary)
        console.log("Detected country:", data.country_code);

        if (data.country_code === "EG" || data.country === "Egypt") {
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
  }, []);

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
