"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "../lang-context";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { FadeUp, SlideIn, StaggerContainer, StaggerItem, ScaleIn } from "../animations";

export default function AboutPage() {
  const { t, dir } = useLang();
  const ap = t.aboutPage;

  return (
    <div dir={dir} className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 noise">
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-accent/10 glow-pulse pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <SlideIn direction={dir === "rtl" ? "right" : "left"}>
            <div className="relative aspect-[4/5] max-w-md rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=1000&fit=crop&crop=faces"
                alt="Captain Maged"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 448px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            </div>
          </SlideIn>

          <FadeUp>
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                {ap.heroTitle1}
                <br />
                <span className="gradient-text">{ap.heroTitle2}</span>
              </h1>
              <p className="text-muted text-lg leading-relaxed max-w-lg">
                {ap.heroDesc}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Story */}
      <section className="py-28">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp>
            <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{ap.storyLabel}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-10">{ap.storyTitle}</h2>
          </FadeUp>
          <div className="flex flex-col gap-6">
            <FadeUp delay={0.1}>
              <p className="text-muted leading-relaxed text-lg">{ap.storyP1}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-muted leading-relaxed text-lg">{ap.storyP2}</p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-muted leading-relaxed text-lg">{ap.storyP3}</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="mb-14">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{ap.valuesLabel}</span>
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 gap-6">
            {ap.values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="bg-surface-light border border-border rounded-xl p-8 glow-border">
                  <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                  <p className="text-muted leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScaleIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">{ap.ctaTitle}</h2>
            <Link
              href="/contact"
              className="inline-block bg-accent text-white font-bold text-sm px-10 py-4 rounded-full hover:bg-accent-light transition-all hover:shadow-[0_0_30px_rgba(165,34,34,0.4)]"
            >
              {ap.ctaButton}
            </Link>
          </ScaleIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
