import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { AboutClient } from "./AboutClient";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "عن كوتش محمد رشدي | كابتن شيكو"
    : "About Coach Mohamed Roshdy | Captain Shiko";
  const description = isAr
    ? "تعرف على كوتش محمد رشدي — مدرب لياقة بدنية متخصص في التحول الجسدي والتغذية الرياضية."
    : "Meet Coach Mohamed Roshdy — elite fitness coach specialising in body transformation and sports nutrition.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.coachmohamedroshdy.com/${locale}/about`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Coach Mohamed Roshdy – Captain Shiko" }],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  };
}

export default async function AboutPage() {
  const transformations = await prisma.transformation.findMany({
    orderBy: { order: 'asc' },
    take: 3
  });

  return <AboutClient dbTransformations={transformations} />;
}
