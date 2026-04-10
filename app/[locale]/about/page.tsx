"use client";

import Image from "next/image";
import { useLang } from "../../lang-context";
import { Navbar } from "../../navbar";
import { Footer } from "../../footer";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
  MagneticButton,
} from "../../animations";

export default function AboutPage() {
  const { t, locale, dir } = useLang();
  const content = (t as any).aboutPage;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Hero Section */}
          <section className="mb-32">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <FadeUp>
                  <span className="text-sm text-accent-light font-black tracking-[0.3em] uppercase mb-4 block">
                    {locale === "en" ? "Introduction" : "مرحباً بكم"}
                  </span>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-8">
                    <span className="gradient-text">{content.hero.title}</span>
                  </h1>
                  <p className="text-muted text-lg lg:text-xl leading-relaxed max-w-2xl font-medium border-r-4 border-accent/30 pr-8 py-2">
                    {content.hero.text}
                  </p>
                </FadeUp>
              </div>
              <div className="lg:col-span-5">
                <ScaleIn delay={0.2}>
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group glow-border border border-white/5 shadow-2xl">
                    <Image
                      src="/about hero section.png"
                      alt="Captain Shiko"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 500px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                </ScaleIn>
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="mb-32">
            <FadeUp>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
                  {content.philosophy.title}
                </h2>
                <div className="w-20 h-1.5 bg-accent mx-auto mt-6 rounded-full" />
              </div>
            </FadeUp>
            
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {[content.philosophy.item1, content.philosophy.item2, content.philosophy.item3].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="h-full p-8 rounded-[2rem] bg-surface-light border border-white/5 hover:border-accent/20 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-muted leading-relaxed font-semibold">
                      {item}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          {/* Success Stories Section (Transformations) */}
          <section className="mb-32">
            <FadeUp>
              <div className="text-center mb-16">
                <span className="text-sm text-accent-light font-black tracking-[0.3em] uppercase mb-4 block">
                  {locale === "en" ? "Real Results" : "نتايج حقيقية"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
                  {(t as any).transformations.title}
                </h2>
                <p className="text-muted mt-4 max-w-xl mx-auto font-medium">
                  {(t as any).transformations.desc}
                </p>
              </div>
            </FadeUp>

            <div className="flex flex-col gap-24 sm:gap-40">
              {((t as any).transformations.clients || []).map((client: any, i: number) => {
                const isEven = i % 2 === 0;
                const imgPath = `/transform-${i + 1}.jpg`;
                
                return (
                  <div 
                    key={client.name}
                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-16 items-center`}
                  >
                    {/* Image Column */}
                    <div className="w-full lg:w-1/2">
                      <FadeUp delay={0.1}>
                        <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group glow-border border border-white/5">
                          <Image
                            src={imgPath}
                            alt={client.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 600px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </FadeUp>
                    </div>

                    {/* Text Column */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8">
                      <FadeUp delay={0.2}>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-5xl font-black text-accent">0{i + 1}</span>
                          <div className="h-1.5 flex-grow bg-accent rounded-full opacity-20" />
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black mb-4">{client.name}</h3>
                        <div className="flex gap-4 mb-6">
                          <span className="px-6 py-2 rounded-full bg-accent text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-accent/20">
                            {client.duration}
                          </span>
                        </div>
                        <p className="text-muted text-lg lg:text-xl leading-relaxed font-semibold bg-surface-light p-8 rounded-[2rem] border border-white/5 italic relative overflow-hidden group-hover:border-accent/30 transition-colors">
                           <span className="absolute top-0 left-0 w-1 h-full bg-accent opacity-50" />
                          "{client.result}"
                        </p>
                      </FadeUp>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Certificates Section */}
          <section className="mb-32 text-center">
            <FadeUp>
              <h2 className="text-3xl sm:text-4xl font-black mb-12 uppercase tracking-tight">
                {content.certificates.title}
              </h2>
              {/* CERTIFICATES CAROUSEL PLACEHOLDER */}
              <div className="w-full h-[400px] rounded-[2.5rem] bg-surface-light border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 group hover:border-accent/30 transition-all">
                <div className="w-20 h-20 rounded-full bg-accent/5 flex items-center justify-center mb-6 text-muted">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold uppercase tracking-[0.2em] mb-2 opacity-30">
                  CERTIFICATES CAROUSEL PLACEHOLDER
                </h4>
                <p className="text-xs text-muted max-w-xs mx-auto">
                  Insert your multi-certificate slider component here later to showcase your academic achievements and professional accreditations.
                </p>
              </div>
            </FadeUp>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
