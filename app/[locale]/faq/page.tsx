import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { FaqClient } from "./FaqClient";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "الأسئلة الشائعة | كوتش محمد رشدي"
    : "FAQ | Coach Mohamed Roshdy";
  const description = isAr
    ? "إجابات على الأسئلة الأكثر شيوعاً حول برامج التدريب والتغذية مع كوتش محمد رشدي."
    : "Answers to the most common questions about training and nutrition programs with Coach Mohamed Roshdy.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.coachmohamedroshdy.com/${locale}/faq`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Coach Mohamed Roshdy – Captain Shiko" }],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  };
}

export default async function FaqPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: 'asc' }
  });

  return <FaqClient faqs={faqs} />;
}
