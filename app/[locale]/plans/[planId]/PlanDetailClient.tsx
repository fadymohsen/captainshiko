"use client";

import { useLang } from "../../../lang-context";
import { Navbar } from "../../../navbar";
import { Footer } from "../../../footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FadeUp,
  ScaleIn,
  StaggerItem,
  MagneticButton,
} from "../../../animations";
import { ImageWithSkeleton } from "../../../image-with-skeleton";

export function PlanDetailClient({ plan }: { plan: any }) {
  const { locale, dir, region: detectedRegion } = useLang();

  const currentPricing = detectedRegion === "egypt" ? {
    monthly: plan.priceMonthlyEgp,
    quarterly: plan.priceQuarterlyEgp,
    currency: "EGP",
  } : {
    monthly: plan.priceMonthlyUsd,
    quarterly: plan.priceQuarterlyUsd,
    currency: "USD",
  };

  const name = locale === 'en' ? plan.nameEn : plan.nameAr;
  const brief = locale === 'en' ? plan.briefEn : plan.briefAr;
  const features = JSON.parse(locale === 'en' ? plan.featuresEn : plan.featuresAr);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          
          <FadeUp>
            <Link 
              href={`/${locale}/plans`} 
              className="inline-flex items-center gap-2 text-muted hover:text-accent-light transition-colors mb-12 group"
            >
              <svg className={`w-4 h-4 transition-transform group-hover:${dir === 'rtl' ? 'translate-x-1' : '-translate-x-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir === 'rtl' ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
              </svg>
              <span className="text-sm font-bold uppercase tracking-widest">
                {locale === "en" ? "Back to Plans" : "العودة للباقات"}
              </span>
            </Link>
          </FadeUp>

          <section className="mb-20">
            <div className="max-w-4xl">
              <FadeUp>
                <span className="inline-block text-accent-light font-black text-xs tracking-[0.3em] uppercase mb-4">
                  {locale === "en" ? "Elite Performance" : "أداء احترافي"}
                </span>
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
                  <span className="gradient-text">{name}</span>
                </h1>
                <p className="text-muted text-xl lg:text-2xl leading-relaxed max-w-2xl font-medium border-l-2 border-accent/30 pl-6 py-2">
                  {brief}
                </p>
              </FadeUp>
            </div>
          </section>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-7 space-y-20">
              <section>
                <FadeUp>
                  <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-2xl font-black uppercase tracking-tight">
                      {locale === "en" ? "The Program" : "محتويات البرنامج"}
                    </h2>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    {features.map((feature: string, idx: number) => (
                      <StaggerItem key={idx}>
                        <div className="h-full p-6 rounded-2xl bg-surface-light/30 border border-white/5 hover:border-accent/20 transition-all group">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-muted leading-relaxed font-semibold text-sm sm:text-base">
                            {feature}
                          </p>
                        </div>
                      </StaggerItem>
                    ))}
                  </div>
                </FadeUp>
              </section>

              <section className="relative">
                <FadeUp>
                  <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-2xl font-black uppercase tracking-tight">
                      {locale === "en" ? "Visual Guide" : "دليل مرئي"}
                    </h2>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-x-0 -inset-y-4 bg-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative aspect-[9/16] max-w-[400px] mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden bg-surface-light border-4 border-white/5 shadow-2xl">
                      <ImageWithSkeleton
                        src="/hero-coach.jpg" // Using this as a placeholder for the reel concept
                        alt="Visual Guide"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        aspectRatio="aspect-[9/16]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80 flex flex-col items-center justify-center p-10 text-center z-20">
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }} 
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-20 h-20 rounded-full bg-accent text-white flex items-center justify-center mb-6 cursor-pointer hover:bg-accent-light"
                        >
                          <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </motion.div>
                        <h4 className="text-lg font-black uppercase tracking-[0.2em] mb-2">Reel Concept</h4>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              </section>
            </div>

            <div className="lg:col-span-5 relative lg:h-full">
              <div className="lg:sticky lg:top-32">
                <ScaleIn>
                  <div className="rounded-[2.5rem] p-10 bg-surface-light border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-[60px] -ml-16 -mb-16" />

                    <div className="relative z-10 text-center lg:text-left">
                      <h3 className="text-2xl font-black mb-8">
                        {locale === "en" ? "Secure Your Spot" : "احجز مكانك الآن"}
                      </h3>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={detectedRegion}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.4 }}
                          className="space-y-6"
                        >
                          <div className="group relative">
                            <div className="p-8 rounded-3xl bg-background/40 border border-white/5 flex flex-col items-center lg:items-start group-hover:border-accent/20 transition-all">
                              <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-2">
                                {locale === "en" ? "Monthly" : "شهرياً"}
                              </span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black group-hover:text-foreground transition-colors">{currentPricing.monthly || 'N/A'}</span>
                                <span className="text-xl font-bold text-muted">{currentPricing.currency}</span>
                              </div>
                            </div>
                          </div>

                          <div className="group relative">
                            <div className="absolute -top-3 -right-3 sm:-right-4 bg-accent text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter z-20 shadow-xl rotate-3">
                              {locale === "en" ? "Best Value" : "الأكثر توفيراً"}
                            </div>
                            <div className="p-8 rounded-3xl bg-accent/[0.03] border border-accent/20 flex flex-col items-center lg:items-start group-hover:bg-accent/5 transition-all">
                              <span className="text-[10px] font-black text-accent-light uppercase tracking-[0.2em] mb-2">
                                {locale === "en" ? "3 Months Bundle" : "باقة ٣ شهور"}
                              </span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-accent-light">{currentPricing.quarterly || 'N/A'}</span>
                                <span className="text-xl font-bold text-muted">{currentPricing.currency}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      <div className="mt-12 space-y-4 relative z-10">
                        <MagneticButton>
                          <a
                            href={`https://wa.me/201148854429?text=${encodeURIComponent(
                              locale === "en" 
                                ? `Hi Captain Shiko! I want to join the ${name} (${detectedRegion === 'egypt' ? 'Local' : 'Global'}).`
                                : `أهلاً كابتن شيكو! حابب أشترك في ${name} (${detectedRegion === 'egypt' ? 'داخل مصر' : 'خارج مصر'}).`
                            )}`}
                            target="_blank"
                            className="w-full block text-center bg-white text-background font-black py-5 rounded-2xl text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all shadow-xl active:scale-95"
                          >
                            {locale === "en" ? "Start Transformation" : "ابدأ التحول الآن"}
                          </a>
                        </MagneticButton>
                        <p className="text-[10px] text-muted text-center tracking-tight">
                          * Secure checkout via WhatsApp. Custom onboarding follows.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScaleIn>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
