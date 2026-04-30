import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ReviewsClient } from "./ReviewsClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "آراء العملاء | كوتش محمد رشدي"
    : "Client Reviews | Coach Mohamed Roshdy";
  const description = isAr
    ? "اقرأ آراء وتجارب عملاء كوتش محمد رشدي الحقيقية في برامج التدريب واللياقة البدنية."
    : "Read real reviews and experiences from Coach Mohamed Roshdy's clients in fitness and training programs.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.coachmohamedroshdy.com/${locale}/reviews`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Coach Mohamed Roshdy – Captain Shiko" }],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  };
}

export default async function ReviewsPage() {
  const setting = await prisma.setting.findUnique({
    where: { key: "showReviewsPage" },
  });

  if (setting?.value !== "true") notFound();

  const reviews = await prisma.review.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
    include: {
      plan: {
        select: {
          nameEn: true,
          nameAr: true,
        }
      }
    }
  });

  return <ReviewsClient reviews={reviews} />;
}
