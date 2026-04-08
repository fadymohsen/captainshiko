"use client";

import Link from "next/link";
import { useLang } from "./lang-context";

export function Navbar() {
  const { locale, t } = useLang();
  const otherLocale = locale === "en" ? "ar" : "en";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/40 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href={`/${locale}/#top`} className="text-xl font-extrabold tracking-tight" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Captain Shiko<span className="text-accent">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-10 text-sm text-muted">
          <a href={`/${locale}/#about`} className="hover:text-foreground transition-colors">{t.nav.about}</a>
          <a href={`/${locale}/#plans`} className="hover:text-foreground transition-colors">{t.nav.programs}</a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${otherLocale}`}
            className="text-xs font-bold border border-white/15 px-3 py-1.5 rounded-full text-muted hover:text-foreground hover:border-white/30 transition-all"
          >
            {locale === "en" ? "عربي" : "EN"}
          </Link>
          <a
            href={`/${locale}/#plans`}
            className="bg-accent text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-accent-light transition-all duration-300 tracking-wider"
          >
            {t.nav.signUp}
          </a>
        </div>
      </div>
    </nav>
  );
}
