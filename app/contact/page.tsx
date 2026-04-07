"use client";

import Image from "next/image";
import { useLang } from "../lang-context";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { FadeUp, SlideIn, ScaleIn } from "../animations";
import { socialLinks } from "../social-links";

export default function ContactPage() {
  const { t, dir } = useLang();
  const cp = t.contactPage;

  return (
    <div dir={dir} className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black">{cp.title}</h1>
            <p className="text-muted mt-4 text-lg max-w-lg mx-auto">{cp.desc}</p>
          </FadeUp>
        </div>
      </section>

      {/* Owner section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <SlideIn direction={dir === "rtl" ? "right" : "left"}>
            <div className="relative aspect-[4/5] max-w-md rounded-2xl overflow-hidden mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=1000&fit=crop&crop=faces"
                alt={cp.ownerName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="bg-background/70 backdrop-blur-md rounded-xl px-5 py-3 border border-border">
                  <div className="text-sm font-bold">{cp.ownerName}</div>
                  <div className="text-xs text-accent-light">{cp.ownerRole}</div>
                </div>
              </div>
            </div>
          </SlideIn>

          <SlideIn direction={dir === "rtl" ? "left" : "right"}>
            <div className="flex flex-col gap-6">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">{cp.ownerLabel}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold">{cp.ownerName}</h2>
              <p className="text-muted leading-relaxed text-[1.05rem]">{cp.ownerBio}</p>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <ScaleIn>
            <div className="bg-surface-light rounded-2xl p-10 sm:p-14 border border-border glow-border">
              <div className="grid sm:grid-cols-2 gap-10">
                {/* Phone & Email */}
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="text-sm text-accent-light font-bold tracking-wider uppercase mb-3">{cp.phone}</h3>
                    <a href="tel:+201234567890" className="text-xl font-bold hover:text-accent-light transition-colors" dir="ltr">
                      +20 123 456 7890
                    </a>
                  </div>
                  <div>
                    <h3 className="text-sm text-accent-light font-bold tracking-wider uppercase mb-3">{cp.email}</h3>
                    <a href="mailto:captainshiko@gmail.com" className="text-xl font-bold hover:text-accent-light transition-colors">
                      captainshiko@gmail.com
                    </a>
                  </div>
                </div>

                {/* Social */}
                <div>
                  <h3 className="text-sm text-accent-light font-bold tracking-wider uppercase mb-4">{cp.followUs}</h3>
                  <div className="flex flex-col gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-muted hover:text-accent-light transition-all duration-300 group"
                      >
                        <span className="group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                        <span className="text-sm font-semibold">{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
