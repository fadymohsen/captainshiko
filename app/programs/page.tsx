"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../lang-context";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { FadeUp, ScaleIn, MagneticButton } from "../animations";

type Region = "egypt" | "abroad";
type Duration = "monthly" | "quarterly";

export default function ProgramsPage() {
  const { t, dir } = useLang();
  const [region, setRegion] = useState<Region>("egypt");
  const [duration, setDuration] = useState<Duration>("monthly");
  const p = t.pricing;

  const egyptPlans = [
    p.egypt.exerciseOnly,
    p.egypt.nutritionOnly,
    p.egypt.gold,
    p.egypt.vip,
  ];

  const abroadPlans = [
    p.abroad.gold,
    p.abroad.vip,
  ];

  const plans = region === "egypt" ? egyptPlans : abroadPlans;
  const highlightIndex = region === "egypt" ? 2 : 0; // Gold highlighted

  return (
    <div dir={dir} className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{p.label}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-4">{p.title}</h1>
            <p className="text-muted mt-4 max-w-xl mx-auto text-[1.05rem] leading-relaxed">
              {p.includes}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Toggles */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-5">
          {/* Region toggle */}
          <FadeUp delay={0.1}>
            <div className="flex bg-surface-light rounded-full p-1 border border-border">
              <button
                onClick={() => setRegion("egypt")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  region === "egypt"
                    ? "bg-accent text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {p.regionToggle.egypt}
              </button>
              <button
                onClick={() => setRegion("abroad")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  region === "abroad"
                    ? "bg-accent text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {p.regionToggle.abroad}
              </button>
            </div>
          </FadeUp>

          {/* Duration toggle */}
          <FadeUp delay={0.15}>
            <div className="flex bg-surface-light rounded-full p-1 border border-border">
              <button
                onClick={() => setDuration("monthly")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  duration === "monthly"
                    ? "bg-white text-background"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {p.durationToggle.monthly}
              </button>
              <button
                onClick={() => setDuration("quarterly")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative ${
                  duration === "quarterly"
                    ? "bg-white text-background"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {p.durationToggle.quarterly}
                <span className="absolute -top-2 -right-2 bg-accent-light text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {p.save}
                </span>
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 relative">
        <div className="absolute top-[30%] left-0 w-[350px] h-[350px] rounded-full bg-accent/8 glow-pulse pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${region}-${duration}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`grid gap-6 max-w-6xl mx-auto ${
                plans.length <= 2 ? "md:grid-cols-2 max-w-3xl" : plans.length === 3 ? "md:grid-cols-3 max-w-5xl" : "md:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {plans.map((plan, i) => {
                const isHighlighted = i === highlightIndex;
                const price = duration === "monthly" ? plan.monthly : plan.quarterly;
                const periodLabel = duration === "monthly" ? p.perMonth : p.perQuarter;
                const isVip = plan.tier === "VIP";

                return (
                  <motion.div
                    key={plan.tier}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className={`rounded-xl p-7 flex flex-col transition-all duration-300 glow-border relative ${
                      isVip
                        ? "bg-accent text-white border-2 border-accent"
                        : isHighlighted
                          ? "bg-surface-light border-2 border-accent/40"
                          : "bg-surface-light border border-border"
                    }`}
                  >
                    {isVip && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-accent text-[10px] font-extrabold px-4 py-1 rounded-full whitespace-nowrap">
                        {p.popular}
                      </span>
                    )}

                    {/* Tier */}
                    <h3 className={`text-sm font-bold mb-5 tracking-wider uppercase ${isVip ? "text-white/70" : "text-muted"}`}>
                      {plan.tier}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 mb-2">
                      {plan.currency !== "$" && (
                        <span className="text-4xl font-extrabold">{price}</span>
                      )}
                      {plan.currency === "$" && (
                        <span className="text-4xl font-extrabold">${price}</span>
                      )}
                    </div>
                    <div className={`text-sm mb-6 ${isVip ? "text-white/50" : "text-muted"}`}>
                      {plan.currency !== "$" ? `${plan.currency} ${periodLabel}` : periodLabel}
                    </div>

                    <div className="w-full h-px bg-current opacity-10 mb-6" />

                    {/* Features */}
                    <div className="flex flex-col gap-3 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-start gap-3">
                          <svg
                            className={`w-4 h-4 mt-0.5 shrink-0 ${isVip ? "text-white" : "text-accent-light"}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={`text-sm ${isVip ? "text-white/80" : "text-muted"}`}>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <MagneticButton>
                      <Link
                        href="/contact"
                        className={`block text-center py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
                          isVip
                            ? "bg-white text-accent hover:bg-white/90"
                            : "border border-accent/30 text-foreground hover:bg-accent/10"
                        }`}
                      >
                        {p.cta}
                      </Link>
                    </MagneticButton>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
