"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "../lang-context";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { FadeUp, StaggerContainer, StaggerItem, ScaleIn, MagneticButton } from "../animations";

const serviceImages = [
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=667&fit=crop",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=667&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=667&fit=crop",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=667&fit=crop",
];

export default function ProgramsPage() {
  const { t, dir } = useLang();

  return (
    <div dir={dir} className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{t.services.label}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-4">
              {t.services.title}
            </h1>
            <p className="text-muted mt-4 max-w-lg mx-auto text-lg">
              {t.hero.desc}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.services.items.map((item, i) => (
              <StaggerItem key={item.title}>
                <div className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer card-zoom glow-border border border-transparent">
                  <Image
                    src={serviceImages[i]}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent group-hover:via-background/60 transition-all duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-lg font-bold mb-2 group-hover:-translate-y-2 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-28 relative">
        <div className="absolute top-[30%] left-0 w-[350px] h-[350px] rounded-full bg-accent/8 glow-pulse pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="mb-14 text-center">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{t.pricing.label}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{t.pricing.title}</h2>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {t.pricing.plans.map((plan, i) => {
              const highlighted = i === 1;
              return (
                <StaggerItem key={plan.tier}>
                  <div
                    className={`rounded-xl p-8 flex flex-col h-full transition-all duration-300 glow-border ${
                      highlighted
                        ? "bg-accent text-white border-2 border-accent scale-[1.03]"
                        : "bg-surface-light border border-border"
                    }`}
                  >
                    {highlighted && (
                      <ScaleIn className="mb-4">
                        <span className="inline-block bg-white text-accent text-xs font-extrabold px-4 py-1 rounded-full">
                          {t.pricing.popular}
                        </span>
                      </ScaleIn>
                    )}
                    <div className="mb-6">
                      <h3 className={`text-sm font-semibold mb-4 ${highlighted ? "text-white/70" : "text-muted"}`}>
                        {plan.tier}
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold">{plan.price}</span>
                        <span className={`text-sm ${highlighted ? "text-white/60" : "text-muted"}`}>
                          {plan.period}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-px bg-current opacity-10 mb-6" />
                    <div className="flex flex-col gap-3.5 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-start gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${highlighted ? "bg-white" : "bg-accent-light"}`} />
                          <span className={`text-sm ${highlighted ? "text-white/80" : "text-muted"}`}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <MagneticButton>
                      <Link
                        href="/contact"
                        className={`block text-center py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
                          highlighted
                            ? "bg-white text-accent hover:bg-white/90"
                            : "border border-accent/30 text-foreground hover:bg-accent/10"
                        }`}
                      >
                        {t.pricing.cta}
                      </Link>
                    </MagneticButton>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <Footer />
    </div>
  );
}
