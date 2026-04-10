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
                      src="/about-owner.jpg"
                      alt="Shiko Ahmed"
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

          {/* Global Reach Section */}
          <section className="mb-32 relative">
             <div className="absolute inset-0 bg-accent/5 -mx-6 sm:-mx-12 rounded-[3rem] pointer-events-none" />
             <div className="relative p-12 sm:p-20 text-center max-w-4xl mx-auto">
                <FadeUp>
                  <h2 className="text-3xl sm:text-4xl font-black mb-8 uppercase tracking-tight">
                    {content.global.title}
                  </h2>
                  <p className="text-muted text-lg leading-relaxed font-medium">
                    {content.global.text}
                  </p>
                </FadeUp>
             </div>
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

            <div className="flex flex-col gap-12 sm:gap-24">
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
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                      <FadeUp delay={0.2}>
                        <div className="flex items-center gap-4">
                          <span className="text-4xl font-black text-accent/20">0{i + 1}</span>
                          <div className="h-px flex-grow bg-gradient-to-r from-accent/20 to-transparent" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black">{client.name}</h3>
                        <div className="flex gap-4">
                          <span className="px-4 py-1.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-widest">
                            {client.duration}
                          </span>
                        </div>
                        <p className="text-muted text-lg leading-relaxed font-medium bg-surface-light p-6 rounded-2xl border border-white/5 italic">
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

          {/* Social Media Section */}
          <section className="text-center">
            <FadeUp>
              <h2 className="text-3xl sm:text-4xl font-black mb-16 uppercase tracking-tight">
                {content.social.title}
              </h2>
              
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { name: "Instagram", icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  ), url: "https://www.instagram.com/shikoahmed88?igsh=cGtndmtvMXN0cGM2&utm_source=qr" },
                  { name: "TikTok", icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
                  ), url: "https://www.tiktok.com/@shikoahmed66?_r=1&_t=ZS-95LQQ5BOtgl" },
                  { name: "Facebook", icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  ), url: "https://www.facebook.com/share/1CBUcbVnV3/?mibextid=wwXIfr" },
                  { name: "YouTube", icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  ), url: "https://youtube.com/@shikoahmed9449?si=uqrXUHQKr7UsbGzo" }
                ].map((social) => (
                  <MagneticButton key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-20 h-20 rounded-2xl bg-surface-light border border-white/5 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all shadow-xl"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </FadeUp>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
