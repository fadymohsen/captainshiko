import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LangProvider } from "../lang-context";
import type { Locale } from "../translations";

const locales: Locale[] = ["en", "ar"];

const metadataByLocale: Record<Locale, Metadata> = {
  en: {
    title: "Captain Shiko | Elite Online Fitness Coaching",
    description:
      "Transform your body with Captain Shiko — personalized training programs, nutrition plans, and 1-on-1 online coaching by Mohamed Roshdy.",
    openGraph: {
      title: "Captain Shiko | Elite Online Fitness Coaching",
      description:
        "Transform your body with Captain Shiko — personalized training, nutrition plans, and 1-on-1 coaching by Mohamed Roshdy.",
      images: [{ url: "/og-image.jpg", width: 800, height: 1067, alt: "Captain Shiko - Mohamed Roshdy" }],
      locale: "en_US",
      type: "website",
    },
  },
  ar: {
    title: "كابتن شيكو | تدريب لياقة أونلاين",
    description:
      "حوّل جسمك مع كابتن شيكو — برامج تدريب مخصصة، خطط تغذية، ومتابعة شخصية مع محمد رشدي.",
    openGraph: {
      title: "كابتن شيكو | تدريب لياقة أونلاين",
      description:
        "حوّل جسمك مع كابتن شيكو — برامج تدريب مخصصة، خطط تغذية، ومتابعة شخصية مع محمد رشدي.",
      images: [{ url: "/og-image.jpg", width: 800, height: 1067, alt: "كابتن شيكو - محمد رشدي" }],
      locale: "ar_EG",
      type: "website",
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
    <div lang={locale} dir={dir}>
      <LangProvider locale={locale as Locale}>{children}</LangProvider>
    </div>
  );
}
