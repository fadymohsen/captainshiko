"use client";

import Image from "next/image";
import { useLang } from "./lang-context";
import {
  FadeUp,
  SlideIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  FloatingElement,
  TextReveal,
  MagneticButton,
  ParallaxImage,
} from "./animations";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/shikoahmed88",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@shikoahmed66",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" /></svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1CBUcbVnV3/?mibextid=wwXIfr",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@shikoahmed9449?si=uqrXUHQKr7UsbGzo",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
    ),
  },
];

const serviceImages = [
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=667&fit=crop",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=667&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=667&fit=crop",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=667&fit=crop",
];

const coachImages = [
  "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=500&h=667&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=500&h=667&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=667&fit=crop&crop=faces",
];

export default function Home() {
  const { locale, t, toggle, dir } = useLang();

  return (
    <div dir={dir} className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-xl font-extrabold tracking-tight">
            Captain Shiko<span className="text-accent">.</span>
          </a>
          <div className="hidden md:flex items-center gap-10 text-sm text-muted">
            <a href="#about" className="hover:text-foreground transition-colors">{t.nav.about}</a>
            <a href="#services" className="hover:text-foreground transition-colors">{t.nav.services}</a>
            <a href="#programs" className="hover:text-foreground transition-colors">{t.nav.programs}</a>
            <a href="#contact" className="hover:text-foreground transition-colors">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="text-xs font-bold border border-white/15 px-3 py-1.5 rounded-full text-muted hover:text-foreground hover:border-white/30 transition-all"
            >
              {locale === "en" ? "عربي" : "EN"}
            </button>
            <a
              href="#contact"
              className="bg-accent text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-accent-light transition-all duration-300"
            >
              {t.nav.signUp}
            </a>
          </div>
        </div>
      </nav>

      {/* ===== HERO + ABOUT OWNER ===== */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 noise">
        {/* Glow orbs */}
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-accent/15 glow-pulse pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-accent/8 glow-pulse pointer-events-none" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo side */}
          <SlideIn direction={dir === "rtl" ? "right" : "left"}>
            <div className="relative flex items-center justify-center">
              {/* Vertical watermark */}
              <div className={`absolute ${dir === "rtl" ? "right-0 translate-x-2" : "left-0 -translate-x-2"} top-1/2 -translate-y-1/2 vertical-text text-[7rem] font-black text-accent/[0.06] leading-none tracking-tight select-none hidden lg:block`}>
                FITNESS
              </div>
              <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=1067&fit=crop&crop=faces"
                  alt="Captain Maged - Coach & Owner"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 448px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                {/* Owner label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <FloatingElement yOffset={5} duration={3}>
                    <div className="bg-background/70 backdrop-blur-md rounded-xl px-5 py-3 border border-border inline-block">
                      <div className="text-sm font-bold">Captain Maged</div>
                      <div className="text-xs text-accent-light">Owner & Head Coach</div>
                    </div>
                  </FloatingElement>
                </div>
              </div>
            </div>
          </SlideIn>

          {/* Content side */}
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
              <p className="text-muted max-w-md leading-relaxed text-[1.05rem]">
                {t.hero.desc}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <MagneticButton>
                  <a
                    href="#contact"
                    className="bg-accent text-white font-bold px-8 py-4 rounded-full text-sm tracking-wider hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(165,34,34,0.4)] block"
                  >
                    {t.hero.cta}
                  </a>
                </MagneticButton>
                <a
                  href="#programs"
                  className="border border-white/15 text-foreground font-semibold px-8 py-4 rounded-full text-sm tracking-wide hover:border-accent/40 hover:text-accent-light transition-all duration-300"
                >
                  {t.hero.programs}
                </a>
              </div>
            </FadeUp>

            {/* Animated stats */}
            <FadeUp delay={0.4}>
              <div className="flex gap-10 pt-4">
                <div>
                  <div className="text-3xl font-black text-accent-light">
                    <AnimatedCounter target={8} suffix="+" />
                  </div>
                  <div className="text-xs text-muted mt-1">{t.hero.statsYears}</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-accent-light">
                    <AnimatedCounter target={500} suffix="+" />
                  </div>
                  <div className="text-xs text-muted mt-1">{t.hero.statsClients}</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-accent-light">
                    <AnimatedCounter target={1000} suffix="+" />
                  </div>
                  <div className="text-xs text-muted mt-1">{t.hero.statsPrograms}</div>
                </div>
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
              <p className="text-muted leading-relaxed max-w-lg text-[1.05rem]">
                {t.about.desc}
              </p>
              <MagneticButton className="w-fit">
                <a
                  href="#contact"
                  className="inline-flex bg-accent text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-accent-light transition-all"
                >
                  {t.about.cta}
                </a>
              </MagneticButton>
            </div>
          </SlideIn>

          <SlideIn direction={dir === "rtl" ? "left" : "right"}>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-xl overflow-hidden relative card-zoom glow-border border border-transparent">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop"
                  alt={t.about.card1}
                  className="absolute inset-0 rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute inset-0 flex items-end p-4 z-10">
                  <span className="text-xs text-white/80 font-semibold">{t.about.card1}</span>
                </div>
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden relative mt-8 card-zoom glow-border border border-transparent">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=800&fit=crop"
                  alt={t.about.card2}
                  className="absolute inset-0 rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute inset-0 flex items-end p-4 z-10">
                  <span className="text-xs text-white/80 font-semibold">{t.about.card2}</span>
                </div>
              </div>
            </div>
          </SlideIn>
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

      {/* ===== COACHES ===== */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="mb-14">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{t.coach.label}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{t.coach.title}</h2>
            </div>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.coach.members.map((coach, i) => (
              <StaggerItem key={coach.name}>
                <div className="group">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden relative mb-4 card-zoom glow-border border border-transparent">
                    <Image
                      src={coachImages[i]}
                      alt={coach.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                  </div>
                  <h3 className="font-bold text-lg">{coach.name}</h3>
                  <p className="text-sm text-muted">{coach.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="programs" className="py-28 relative">
        <div className="absolute top-[30%] left-0 w-[350px] h-[350px] rounded-full bg-accent/8 glow-pulse pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="mb-14">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{t.pricing.label}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{t.pricing.title}</h2>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl">
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
                      <a
                        href="#contact"
                        className={`block text-center py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
                          highlighted
                            ? "bg-white text-accent hover:bg-white/90"
                            : "border border-accent/30 text-foreground hover:bg-accent/10"
                        }`}
                      >
                        {t.pricing.cta}
                      </a>
                    </MagneticButton>
                  </div>
                </StaggerItem>
              );
            })}
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
                    <p className="text-muted max-w-md leading-relaxed">
                      {t.cta.desc}
                    </p>
                  </FadeUp>
                </div>
                <FadeUp delay={0.2}>
                  <div className="flex flex-col gap-5 items-center lg:items-end">
                    <div className="flex items-center gap-5">
                      {socialLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-accent-light hover:scale-125 transition-all duration-300"
                          aria-label={link.label}
                        >
                          {link.icon}
                        </a>
                      ))}
                    </div>
                    <MagneticButton>
                      <a
                        href="https://www.instagram.com/shikoahmed88"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-accent text-white font-bold text-sm px-8 py-3.5 rounded-full hover:bg-accent-light transition-all hover:shadow-[0_0_30px_rgba(165,34,34,0.4)] block"
                      >
                        {t.cta.button}
                      </a>
                    </MagneticButton>
                  </div>
                </FadeUp>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-lg font-extrabold tracking-tight">
            Captain Shiko<span className="text-accent">.</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-muted">
            <a href="#about" className="hover:text-accent-light transition-colors">{t.nav.about}</a>
            <a href="#services" className="hover:text-accent-light transition-colors">{t.nav.services}</a>
            <a href="#programs" className="hover:text-accent-light transition-colors">{t.nav.programs}</a>
            <a href="#contact" className="hover:text-accent-light transition-colors">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent-light hover:scale-110 transition-all duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted text-center">
            &copy; {new Date().getFullYear()} Captain Shiko. {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
