"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "./lang-context";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { socialLinks } from "./social-links";
import {
  FadeUp,
  SlideIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
  TextReveal,
  MagneticButton,
} from "./animations";

const transformationImages = [
  "/transform-1.jpg",
  "/transform-2.jpg",
  "/transform-3.jpg",
  "/transform-4.jpg",
];

type Region = "egypt" | "abroad";
type Duration = "monthly" | "quarterly";

export default function Home() {
  const { t, dir } = useLang();
  const [region, setRegion] = useState<Region>("egypt");
  const [duration, setDuration] = useState<Duration>("monthly");
  const p = t.pricing;

  const egyptPlans = [p.egypt.basic, p.egypt.gold, p.egypt.vip];
  const abroadPlans = [p.abroad.gold, p.abroad.vip];
  const plans = region === "egypt" ? egyptPlans : abroadPlans;
  const highlightIndex = region === "egypt" ? 1 : 0;

  return (
    <div dir={dir} className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 noise">
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-accent/15 glow-pulse pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-accent/8 glow-pulse pointer-events-none" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
          <SlideIn direction={dir === "rtl" ? "right" : "left"}>
            <div className="relative flex items-center justify-center">
              <div className={`absolute ${dir === "rtl" ? "right-0 translate-x-2" : "left-0 -translate-x-2"} top-1/2 -translate-y-1/2 vertical-text text-[7rem] font-black text-accent/[0.06] leading-none tracking-tight select-none hidden lg:block`}>
                FITNESS
              </div>
              <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden group">
                <Image
                  src="/hero-coach.jpg"
                  alt="Mohamed Roshdy - Founder"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 448px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <FloatingElement yOffset={5} duration={3}>
                    <div className="bg-background/70 backdrop-blur-md rounded-xl px-5 py-3 border border-border inline-block">
                      <div className="text-sm font-bold">Mohamed Roshdy</div>
                      <div className="text-xs text-accent-light">Founder</div>
                    </div>
                  </FloatingElement>
                </div>
              </div>
            </div>
          </SlideIn>

          <div className="flex flex-col gap-7">
            <FadeUp>
              <span className="inline-flex items-center gap-2 text-accent-light text-xs font-bold tracking-[0.2em] uppercase border border-accent/20 px-4 py-1.5 rounded-full w-fit">
                <span className="w-2 h-2 rounded-full bg-accent-light animate-pulse" />
                {t.hero.badge}
              </span>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                <TextReveal text={t.hero.title1} />
                <br />
                <span className="gradient-text"><TextReveal text={t.hero.title2} /></span>
                <br />
                <TextReveal text={t.hero.title3} />
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-muted max-w-md leading-relaxed text-[1.05rem]">{t.hero.desc}</p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <MagneticButton>
                <a
                  href="#plans"
                  className="bg-accent text-white font-bold px-8 py-4 rounded-full text-sm tracking-wider hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(165,34,34,0.4)] inline-block"
                >
                  {t.hero.programs}
                </a>
              </MagneticButton>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== SCROLLING BANNER ===== */}
      <section className="py-4 bg-accent -rotate-1 scale-105 overflow-hidden relative z-10">
        <div className="flex animate-scroll-left whitespace-nowrap">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex shrink-0">
              {t.banner.map((text, i) => (
                <span key={i} className="text-white text-sm font-extrabold tracking-[0.2em] uppercase mx-8">
                  {text} <span className="mx-4 opacity-50">&#9679;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <SlideIn direction={dir === "rtl" ? "right" : "left"}>
            <div className="flex flex-col gap-6">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{t.about.label}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                {t.about.title1}
                <br />
                <span className="text-muted">{t.about.title2}</span>
              </h2>
              <p className="text-muted leading-relaxed max-w-lg text-[1.05rem]">{t.about.desc}</p>
            </div>
          </SlideIn>

          <SlideIn direction={dir === "rtl" ? "left" : "right"}>
            <div className="relative aspect-[3/4] max-w-md rounded-2xl overflow-hidden group glow-border border border-transparent mx-auto">
              <Image
                src="/about-owner.jpg"
                alt="Mohamed Roshdy - Founder"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 448px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="bg-background/70 backdrop-blur-md rounded-xl px-5 py-3 border border-border">
                  <div className="text-sm font-bold">Mohamed Roshdy</div>
                  <div className="text-xs text-accent-light">Founder</div>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ===== TRANSFORMATIONS ===== */}
      <section className="py-28 bg-surface relative noise">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{t.transformations.label}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{t.transformations.title}</h2>
              <p className="text-muted mt-4 max-w-md mx-auto">{t.transformations.desc}</p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.transformations.clients.map((client, i) => (
              <StaggerItem key={client.name}>
                <div className="group rounded-xl overflow-hidden bg-surface-light border border-border glow-border">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={transformationImages[i]}
                      alt={`${client.name} transformation`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-sm">{client.name}</h4>
                    <p className="text-xs text-muted mt-1 leading-relaxed">{client.result}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== PLANS ===== */}
      <section id="plans" className="py-28 relative">
        <div className="absolute top-[30%] left-0 w-[350px] h-[350px] rounded-full bg-accent/8 glow-pulse pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{p.label}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{p.title}</h2>
              <p className="text-muted mt-4 max-w-xl mx-auto text-[1.05rem] leading-relaxed">{p.includes}</p>
            </div>
          </FadeUp>

          {/* Toggles */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <FadeUp delay={0.1}>
              <div className="flex bg-surface-light rounded-full p-1 border border-border">
                <button
                  onClick={() => setRegion("egypt")}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${region === "egypt" ? "bg-accent text-white" : "text-muted hover:text-foreground"}`}
                >
                  {p.regionToggle.egypt}
                </button>
                <button
                  onClick={() => setRegion("abroad")}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${region === "abroad" ? "bg-accent text-white" : "text-muted hover:text-foreground"}`}
                >
                  {p.regionToggle.abroad}
                </button>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="flex bg-surface-light rounded-full p-1 border border-border">
                <button
                  onClick={() => setDuration("monthly")}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${duration === "monthly" ? "bg-white text-background" : "text-muted hover:text-foreground"}`}
                >
                  {p.durationToggle.monthly}
                </button>
                <button
                  onClick={() => setDuration("quarterly")}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative ${duration === "quarterly" ? "bg-white text-background" : "text-muted hover:text-foreground"}`}
                >
                  {p.durationToggle.quarterly}
                  <span className="absolute -top-2 -right-2 bg-accent-light text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{p.save}</span>
                </button>
              </div>
            </FadeUp>
          </div>

          {/* Plan cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${region}-${duration}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`grid gap-6 max-w-5xl mx-auto ${plans.length <= 2 ? "md:grid-cols-2 max-w-3xl" : "md:grid-cols-3"}`}
            >
              {plans.map((plan, i) => {
                const isVip = plan.tier === "VIP";
                const isHighlighted = i === highlightIndex;
                const price = duration === "monthly" ? plan.monthly : plan.quarterly;
                const periodLabel = duration === "monthly" ? p.perMonth : p.perQuarter;

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
                    <h3 className={`text-sm font-bold mb-5 tracking-wider uppercase ${isVip ? "text-white/70" : "text-muted"}`}>{plan.tier}</h3>
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-4xl font-extrabold">{plan.currency === "$" ? `$${price}` : price}</span>
                    </div>
                    <div className={`text-sm mb-6 ${isVip ? "text-white/50" : "text-muted"}`}>
                      {plan.currency !== "$" ? `${plan.currency} ${periodLabel}` : periodLabel}
                    </div>
                    <div className="w-full h-px bg-current opacity-10 mb-6" />
                    <div className="flex flex-col gap-3 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-start gap-3">
                          <svg className={`w-4 h-4 mt-0.5 shrink-0 ${isVip ? "text-white" : "text-accent-light"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={`text-sm ${isVip ? "text-white/80" : "text-muted"}`}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <MagneticButton>
                      <a
                        href={`https://wa.me/201148854429?text=${encodeURIComponent(`Hi Captain Shiko! I'm interested in the ${plan.tier} plan (${plan.currency === "$" ? `$${price}` : `${price} ${plan.currency}`} ${duration === "monthly" ? "monthly" : "3 months"}). I'd like to get started!`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block text-center py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
                          isVip
                            ? "bg-white text-accent hover:bg-white/90"
                            : "border border-accent/30 text-foreground hover:bg-accent/10"
                        }`}
                      >
                        {p.cta}
                      </a>
                    </MagneticButton>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <ScaleIn>
            <div className="rounded-2xl overflow-hidden relative border border-border glow-border">
              <Image
                src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1400&h=600&fit=crop"
                alt="Gym background"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-background/85" />
              <div className="relative p-10 sm:p-16 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <FadeUp>
                    <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{t.cta.label}</span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
                      {t.cta.title1}
                      <br />
                      <span className="gradient-text">{t.cta.title2}</span>
                    </h2>
                    <p className="text-muted max-w-md leading-relaxed">{t.cta.desc}</p>
                  </FadeUp>
                </div>
                <FadeUp delay={0.2}>
                  <div className="flex items-center gap-5">
                    {socialLinks.map((link) => (
                      <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent-light hover:scale-125 transition-all duration-300" aria-label={link.label}>
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </FadeUp>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
