import { notFound } from "next/navigation";
import { LangProvider } from "../lang-context";
import type { Locale } from "../translations";

const locales: Locale[] = ["en", "ar"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
