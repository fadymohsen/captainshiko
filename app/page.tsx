"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

const serviceImages = [
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=667&fit=crop",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=667&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=667&fit=crop",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=667&fit=crop",
];

const transformationImages = [
  "/transform-1.jpg",
  "/transform-2.jpg",
  "/transform-3.jpg",
  "/transform-4.jpg",
];

function BookCallModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, dir } = useLang();
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        dir={dir}
        className="relative bg-surface-light border border-border rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors text-xl leading-none">
          &times;
        </button>

        {!submitted ? (
          <>
            <h3 className="text-2xl font-extrabold mb-2">
              {dir === "rtl" ? "احجز مكالمتك المجانية" : "Book Your Free Call"}
            </h3>
            <p className="text-sm text-muted mb-6">
              {dir === "rtl"
                ? "سجّل بياناتك وهنتواصل معاك لحجز مكالمة مجانية مع كابتن شيكو"
                : "Fill in your details and we'll reach out to schedule a free call with Captain Shiko"}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                required
                placeholder={dir === "rtl" ? "الاسم" : "Your Name"}
                className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
              />
              <input
                type="tel"
                required
                placeholder={dir === "rtl" ? "رقم الهاتف" : "Phone Number"}
                className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                dir="ltr"
              />
              <textarea
                rows={3}
                placeholder={dir === "rtl" ? "أهلاً كابتن، عايز أحجز مكالمة مجانية..." : "Hi Captain, I'd like to book a free call..."}
                className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="bg-accent text-white font-bold text-sm py-3.5 rounded-full hover:bg-accent-light transition-all hover:shadow-[0_0_20px_rgba(165,34,34,0.3)]"
              >
                {dir === "rtl" ? "احجز الآن" : "Book Now"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">&#10003;</div>
            <h3 className="text-xl font-extrabold mb-2">
              {dir === "rtl" ? "تم التسجيل!" : "You're In!"}
            </h3>
            <p className="text-sm text-muted">
              {dir === "rtl"
                ? "هنتواصل معاك قريباً لحجز المكالمة"
                : "We'll reach out soon to schedule your free call"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const { t, dir } = useLang();
  const [showBookCall, setShowBookCall] = useState(false);

  return (
    <div dir={dir} className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar onBookCall={() => setShowBookCall(true)} />
      <BookCallModal open={showBookCall} onClose={() => setShowBookCall(false)} />

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
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
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
              <div className="flex flex-wrap gap-4">
                <MagneticButton>
                  <button
                    onClick={() => setShowBookCall(true)}
                    className="bg-accent text-white font-bold px-8 py-4 rounded-full text-sm tracking-wider hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(165,34,34,0.4)]"
                  >
                    {t.hero.cta}
                  </button>
                </MagneticButton>
                <Link
                  href="/programs"
                  className="border border-white/15 text-foreground font-semibold px-8 py-4 rounded-full text-sm tracking-wide hover:border-accent/40 hover:text-accent-light transition-all duration-300"
                >
                  {t.hero.programs}
                </Link>
              </div>
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
              <MagneticButton className="w-fit">
                <Link
                  href="/about"
                  className="inline-flex bg-accent text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-accent-light transition-all"
                >
                  {t.about.cta}
                </Link>
              </MagneticButton>
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

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="mb-14">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{t.services.label}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{t.services.title}</h2>
            </div>
          </FadeUp>

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
                    <h3 className="text-lg font-bold mb-2 group-hover:-translate-y-2 transition-transform duration-300">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="contact" className="py-28">
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
                  <div className="flex flex-col gap-5 items-center lg:items-end">
                    <div className="flex items-center gap-5">
                      {socialLinks.map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent-light hover:scale-125 transition-all duration-300" aria-label={link.label}>
                          {link.icon}
                        </a>
                      ))}
                    </div>
                    <MagneticButton>
                      <Link
                        href="/programs"
                        className="bg-accent text-white font-bold text-sm px-8 py-3.5 rounded-full hover:bg-accent-light transition-all hover:shadow-[0_0_30px_rgba(165,34,34,0.4)] block"
                      >
                        {dir === "rtl" ? "ابدأ الآن" : "Start Now"}
                      </Link>
                    </MagneticButton>
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
