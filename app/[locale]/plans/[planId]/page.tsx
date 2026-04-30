import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { PlanDetailClient } from "./PlanDetailClient";
import { Navbar } from "../../../navbar";
import { Footer } from "../../../footer";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; planId: string }> }): Promise<Metadata> {
  const { locale, planId } = await params;
  const plan = await prisma.plan.findUnique({ where: { slug: planId } });
  if (!plan) return {};
  const isAr = locale === "ar";
  const planName = isAr ? plan.nameAr : plan.nameEn;
  const title = isAr
    ? `${planName} | كوتش محمد رشدي`
    : `${planName} | Coach Mohamed Roshdy`;
  const description = isAr
    ? `اشترك في باقة ${planName} مع كوتش محمد رشدي — تدريب شخصي وخطة تغذية مخصصة لتحقيق أهدافك.`
    : `Join the ${planName} with Coach Mohamed Roshdy — personalised training and nutrition plan to reach your goals.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.coachmohamedroshdy.com/${locale}/plans/${planId}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${planName} – Coach Mohamed Roshdy` }],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  };
}

export default async function PlanDetailPage({ params }: { params: Promise<{ locale: string; planId: string }> }) {
  const { locale, planId } = await params;
  const plan = await prisma.plan.findUnique({ where: { slug: planId } });

  if (!plan) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center pt-24 gap-4">
          <h1 className="text-3xl font-black">Plan Not Found</h1>
          <a href={`/${locale}/plans`} className="text-accent underline tracking-widest uppercase text-xs font-bold">Return to Plans</a>
        </div>
        <Footer />
      </div>
    );
  }

  return <PlanDetailClient plan={plan} />;
}
