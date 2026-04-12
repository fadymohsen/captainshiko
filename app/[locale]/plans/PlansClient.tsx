"use client";

import { useLang } from "../../lang-context";
import { Navbar } from "../../navbar";
import { Footer } from "../../footer";
import Link from "next/link";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  MagneticButton,
} from "../../animations";

export function PlansClient({ plans }: { plans: any[] }) {
  const { t, locale, dir, region } = useLang();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 relative">
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-accent/10 glow-pulse pointer-events-none" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-accent/5 glow-pulse pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">
                {locale === "en" ? "Choose Your Path" : "اختر طريقك"}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-4 mb-6 leading-tight">
                {locale === "en" ? "TRANSFORMATION " : "باقات " }
                <span className="gradient-text">{locale === "en" ? "PLANS" : "التحول"}</span>
              </h1>
              <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
                {locale === "en" 
                  ? "Choose the plan that fits your goals and lifestyle. Science-backed programs tailored for results."
                  : "اختر الباقة اللي تناسب أهدافك ونمط حياتك. برامج مبنية على أسس علمية ومصممة خصيصاً عشان توصل لأفضل نتايج."}
              </p>
            </div>
          </FadeUp>

          <div className="flex flex-wrap justify-center gap-8">
            {plans.filter(p => p.isActive).map((plan) => (
              <StaggerItem key={plan.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] max-w-sm lg:max-w-none">
                <div className="group h-full flex flex-col rounded-2xl p-8 bg-surface-light border border-border hover:border-accent/30 transition-all duration-500 relative glow-border overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent/10 transition-colors duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-light transition-colors">
                      {locale === 'en' ? plan.nameEn : plan.nameAr}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-8 flex-grow italic">
                      "{locale === 'en' ? plan.briefEn : plan.briefAr}"
                    </p>
                    
                    <div className="mb-8 p-4 rounded-xl bg-background/40 border border-white/5">
                      <div className="text-xs text-muted uppercase tracking-widest mb-1">
                        {region === "egypt" 
                          ? (locale === "en" ? "Local Subscription" : "الاشتراك من داخل مصر")
                          : (locale === "en" ? "Global Subscription" : "الاشتراك الدولي")}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black">
                          {region === "egypt" 
                            ? plan.priceMonthlyEgp 
                            : plan.priceMonthlyUsd}
                        </span>
                        <span className="text-sm text-muted font-bold uppercase tracking-tight">
                          {region === "egypt" ? "EGP" : "USD"} {locale === "en" ? "/Mo" : "شهرياً"}
                        </span>
                      </div>
                    </div>

                    <MagneticButton>
                      <Link
                        href={`/${locale}/plans/${plan.slug}`}
                        className="block w-full text-center py-4 rounded-full text-sm font-bold bg-white/5 border border-white/10 text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
                      >
                        {(t as any).common.knowMore}
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
