"use client";

import Link from "next/link";
import { useLang } from "./lang-context";
import { socialLinks } from "./social-links";

export function Footer() {
  const { t, locale } = useLang();

  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href={`/${locale}`} className="text-lg font-extrabold tracking-tight">
          Captain Shiko<span className="text-accent">.</span>
        </Link>
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
        <p className="text-xs text-muted text-center mt-2">
          Powered by{" "}
          <a
            href="https://veliq.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-semibold hover:text-accent-light transition-colors"
          >
            VELIQ
          </a>
        </p>
      </div>
    </footer>
  );
}
