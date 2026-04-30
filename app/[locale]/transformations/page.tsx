import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { TransformationsClient } from "./TransformationsClient";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "قصص التحول | كوتش محمد رشدي"
    : "Transformations | Coach Mohamed Roshdy";
  const description = isAr
    ? "شاهد نتائج حقيقية لعملاء كوتش محمد رشدي — قصص تحول مذهلة في اللياقة البدنية والتغذية."
    : "See real results from Coach Mohamed Roshdy's clients — stunning fitness and nutrition transformation stories.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.coachmohamedroshdy.com/${locale}/transformations`,
      images: [{ url: "https://www.coachmohamedroshdy.com/og-image.jpg", width: 1200, height: 630, alt: "Coach Mohamed Roshdy – Captain Shiko" }],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: ["https://www.coachmohamedroshdy.com/og-image.jpg"] },
  };
}

export default async function TransformationsPage() {
  const transformations = await prisma.transformation.findMany({
    orderBy: { order: 'asc' }
  });

  return <TransformationsClient dbTransformations={transformations} />;
}
