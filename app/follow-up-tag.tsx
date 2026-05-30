import React from "react";

const CONFIG = {
  daily:   { en: "Daily Follow-up",   ar: "متابعة يومية",    className: "text-amber-400 bg-amber-500/10 border-amber-500/25" },
  weekly:  { en: "Weekly Follow-up",  ar: "متابعة أسبوعية", className: "text-accent-light bg-accent/10 border-accent/25" },
  monthly: { en: "Monthly Follow-up", ar: "متابعة شهرية",   className: "text-slate-300 bg-white/5 border-white/10" },
};

export function FollowUpTag({ frequency, locale }: { frequency: string | null | undefined; locale: string }) {
  if (!frequency) return null;
  const cfg = CONFIG[frequency as keyof typeof CONFIG];
  if (!cfg) return null;

  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest border px-3 py-1 rounded-full ${cfg.className}`}>
      <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {locale === "ar" ? cfg.ar : cfg.en}
    </span>
  );
}
