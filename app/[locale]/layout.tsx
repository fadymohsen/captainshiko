import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Almarai } from "next/font/google";
import { LangProvider } from "../lang-context";
import type { Locale } from "../translations";
import { WhatsAppButton } from "../whatsapp-button";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"], // Almarai supports these
});

const locales: Locale[] = ["en", "ar"];

const metadataByLocale: Record<Locale, Metadata> = {
  en: {
    title: "Coach Mohamed Roshdy | Elite Online Fitness Coaching",
    description:
      "Transform your body with Coach Mohamed Roshdy — personalized training programs, nutrition plans, and 1-on-1 online coaching.",
    openGraph: {
      title: "Coach Mohamed Roshdy | Elite Online Fitness Coaching",
      description:
        "Transform your body with Coach Mohamed Roshdy — personalized training, nutrition plans, and 1-on-1 coaching.",
      images: [{ url: "/hero-coach.jpg", width: 1200, height: 630, alt: "Coach Mohamed Roshdy – Captain Shiko" }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images: ["/hero-coach.jpg"],
    },
  },
  ar: {
    title: "كوتش محمد رشدي | تدريب لياقة أونلاين",
    description:
      "حوّل جسمك مع كوتش محمد رشدي — برامج تدريب مخصصة، خطط تغذية، ومتابعة شخصية.",
    openGraph: {
      title: "كوتش محمد رشدي | تدريب لياقة أونلاين",
      description:
        "حوّل جسمك مع كوتش محمد رشدي — برامج تدريب مخصصة، خطط تغذية، ومتابعة شخصية.",
      images: [{ url: "/hero-coach.jpg", width: 1200, height: 630, alt: "كوتش محمد رشدي – كابتن شيكو" }],
      locale: "ar_EG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images: ["/hero-coach.jpg"],
    },
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  return metadataByLocale[locale as Locale];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div lang={locale} dir={dir} className={locale === "ar" ? almarai.className : ""}>
      {locale === "ar" && (
        <style dangerouslySetInnerHTML={{ __html: `* { --font-sans: ${almarai.style.fontFamily} !important; }` }} />
      )}
      <LangProvider locale={locale as Locale}>
        {children}
        <WhatsAppButton />
      </LangProvider>
    </div>
  );
}
