import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { PlansClient } from "./PlansClient";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "باقات التدريب | كوتش محمد رشدي"
    : "Coaching Plans | Coach Mohamed Roshdy";
  const description = isAr
    ? "اختر باقة التدريب المناسبة لأهدافك — برامج شهرية وربع سنوية مع متابعة شخصية من كوتش محمد رشدي."
    : "Choose the coaching plan that fits your goals — monthly and quarterly programs with personal follow-up from Coach Mohamed Roshdy.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.coachmohamedroshdy.com/${locale}/plans`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Coach Mohamed Roshdy – Captain Shiko" }],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  };
}

export default async function PlansPage() {
  const plans = await prisma.plan.findMany({
    orderBy: { order: 'asc' }
  });

  return <PlansClient plans={plans} />;
}
