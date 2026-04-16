"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../lang-context";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { socialLinks } from "../social-links";
import {
  FadeUp,
  SlideIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
  TextReveal,
  MagneticButton,
} from "../animations";
import { ImageWithSkeleton } from "../image-with-skeleton";

// Removed hardcoded transformationImages in favor of translations.transformationsData

type Duration = "monthly" | "quarterly";

export function HomeClient({ dbPlans, dbTransformations }: { dbPlans: any[], dbTransformations: any[] }) {
  const { t, locale, dir, region } = useLang();
  const [duration, setDuration] = useState<Duration>("monthly");
  const p = t.pricing;

  const plans = dbPlans.filter(p => p.isActive).map(planData => {
    const pricing = region === "egypt" 
      ? { monthly: planData.priceMonthlyEgp, quarterly: planData.priceQuarterlyEgp, currency: "EGP" } 
      : { monthly: planData.priceMonthlyUsd, quarterly: planData.priceQuarterlyUsd, currency: "USD" };
      
    return {
      slug: planData.slug,
      name: locale === "en" ? planData.nameEn : planData.nameAr,
      brief: locale === "en" ? planData.briefEn : planData.briefAr,
      monthly: pricing.monthly,
      quarterly: pricing.quarterly,
      currency: pricing.currency,
    };
  });

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
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
                <ImageWithSkeleton
                  src="/hero-coach.jpg"
                  alt="Mohamed Roshdy - Founder"
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
              <h1 className={`font-black tracking-tight ${locale === 'ar' ? 'text-5xl sm:text-6xl lg:text-8xl leading-[1.3] mb-4' : 'text-4xl sm:text-5xl lg:text-7xl leading-[1.1]'}`}>
                <TextReveal text={t.hero.title1} />
                <br />
                <span className="gradient-text"><TextReveal text={t.hero.title2} /></span>
                <br />
                <TextReveal text={t.hero.title3} />
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className={`text-muted max-w-md leading-relaxed ${locale === 'ar' ? 'text-lg mt-4' : 'text-[1.05rem]'}`}>{t.hero.desc}</p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <MagneticButton>
                <a
                  href={`/${locale}/#plans`}
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
      <section className="py-4 bg-accent overflow-hidden relative z-10 flex items-center">
        <div className={`flex ${dir === 'rtl' ? 'animate-scroll-right' : 'animate-scroll-left'} w-max whitespace-nowrap will-change-transform`}>
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
              <div className="mt-4">
                <MagneticButton>
                  <Link
                    href={`/${locale}/about`}
                    className="inline-flex items-center gap-2 text-accent-light font-bold hover:gap-4 transition-all duration-300"
                  >
                    {(t as any).common.knowMore}
                    <svg className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M5 12h16" />
                    </svg>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </SlideIn>

          <SlideIn direction={dir === "rtl" ? "left" : "right"}>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden group glow-border border border-white/5 shadow-2xl">
              <ImageWithSkeleton
                src="/coach-main.jpeg"
                alt="Captain Shiko"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
            {(dbTransformations && dbTransformations.length > 0 ? dbTransformations : t.transformationsData.slice(0, 4)).map((client: any, i: number) => (
              <StaggerItem key={client.id || `${client.name}-${i}`}>
                <div className="group rounded-xl overflow-hidden bg-surface-light border border-border glow-border">
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithSkeleton
                      src={client.imagePath || client.img}
                      alt={`${locale === 'ar' ? (client.nameAr || client.name) : (client.nameEn || client.name)} transformation`}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-transparent to-transparent z-20" />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm">{locale === 'ar' ? client.nameAr : client.nameEn}</h4>
                      <span className="text-[10px] font-bold text-accent-light px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                        {locale === 'ar' ? client.durationAr : client.durationEn}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                        {locale === 'ar' ? client.resultAr : client.resultEn}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.4}>
            <div className="mt-16 text-center">
              <Link
                href={`/${locale}/transformations`}
                className="inline-flex items-center gap-2 group px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold uppercase tracking-widest text-sm"
              >
                {t.transformationsPage.galleryTitle}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </FadeUp>
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
              key={duration}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto"
            >
              {plans.map((plan, i) => {
                const isHighlighted = plan.slug === "elite-transformation";
                const isVip = plan.slug === "elite-coaching";
                const price = duration === "monthly" ? plan.monthly : plan.quarterly;
                const periodLabel = duration === "monthly" ? p.perMonth : p.perQuarter;

                return (
                  <motion.div
                    key={plan.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="rounded-[2rem] p-8 flex flex-col transition-all duration-300 glow-border relative bg-surface-light w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] min-w-[300px] max-w-[350px] border border-white/10 hover:border-accent/30 shadow-xl"
                  >
                    <h3 className="text-lg font-black mb-4 tracking-tight text-foreground">{plan.name}</h3>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-4xl font-black text-foreground">{price}</span>
                    </div>
                    <div className="text-sm mb-6 text-muted font-bold">
                      {plan.currency} {periodLabel}
                    </div>
                    <div className="w-full h-px bg-white/5 mb-6" />
                    <p className="text-sm text-muted leading-relaxed mb-8 flex-1 italic">
                      "{plan.brief}"
                    </p>
                    <MagneticButton>
                      <Link
                        href={`/${locale}/plans/${plan.slug}`}
                        className="block text-center py-4 rounded-full text-xs font-black tracking-widest uppercase bg-accent text-white hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/20"
                      >
                        {(t as any).common.knowMore}
                      </Link>
                    </MagneticButton>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== SEE ALL PLANS CTA ===== */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="bg-surface-light/30 border border-white/5 rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h3 className="text-2xl sm:text-3xl font-black mb-6 relative z-10">
                {locale === "en" ? "Want more options?" : "عايز خيارات أكتر؟"}
              </h3>
              <p className="text-muted mb-10 max-w-lg mx-auto relative z-10 font-medium">
                {locale === "en" 
                  ? "Explore our full range of 5 specialized transformation programs designed for every goal."
                  : "اكتشف الـ ٥ باقات المتخصصة اللي صممناها عشان تناسب كل الأهداف ومستويات اللياقة."}
              </p>
              <div className="relative z-10">
                <MagneticButton>
                  <Link
                    href={`/${locale}/plans`}
                    className="inline-block bg-accent text-white font-black px-10 py-5 rounded-full text-sm uppercase tracking-widest hover:bg-accent-light transition-all shadow-xl"
                  >
                    {(t as any).nav.seeAllPlans}
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===== SOCIAL CTA ===== */}
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
