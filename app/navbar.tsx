"use client";

import Link from "next/link";
import { useLang } from "./lang-context";

export function Navbar({ onBookCall }: { onBookCall?: () => void }) {
  const { locale, t, toggle } = useLang();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          Captain Shiko<span className="text-accent">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-10 text-sm text-muted">
          <Link href="/about" className="hover:text-foreground transition-colors">{t.nav.about}</Link>
          <Link href="/programs" className="hover:text-foreground transition-colors">{t.nav.programs}</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">{t.nav.contact}</Link>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs font-bold border border-white/15 px-3 py-1.5 rounded-full text-muted hover:text-foreground hover:border-white/30 transition-all"
          >
            {locale === "en" ? "عربي" : "EN"}
          </button>
          {onBookCall ? (
            <button
              onClick={onBookCall}
              className="bg-accent text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-accent-light transition-all duration-300"
            >
              {t.nav.signUp}
            </button>
          ) : (
            <Link
              href="/contact"
              className="bg-accent text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-accent-light transition-all duration-300"
            >
              {t.nav.signUp}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
