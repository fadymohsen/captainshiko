import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Navbar } from "../../../navbar";
import { Footer } from "../../../footer";
import PolicyContent from "./PolicyContent";
import Link from "next/link";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const policy = await prisma.policy.findUnique({ where: { slug } });
  if (!policy) return {};
  const title = `${locale === "en" ? policy.titleEn : policy.titleAr} | Coach Mohamed Roshdy`;
  const description = locale === "ar"
    ? "اقرأ سياسات موقع كوتش محمد رشدي."
    : "Read the policies of Coach Mohamed Roshdy's website.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.coachmohamedroshdy.com/${locale}/policies/${slug}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Coach Mohamed Roshdy – Captain Shiko" }],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  };
}

export default async function PolicyPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;

  const policy = await prisma.policy.findUnique({ where: { slug } });

  if (!policy) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center pt-24 gap-4">
          <h1 className="text-3xl font-black">Policy Not Found</h1>
          <Link href={`/${locale}`} className="text-accent underline tracking-widest uppercase text-xs font-bold">Return Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const title = locale === "en" ? policy.titleEn : policy.titleAr;
  const content = locale === "en" ? policy.contentEn : policy.contentAr;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <PolicyContent
        title={title}
        content={content}
        locale={locale}
        updatedAt={policy.updatedAt}
      />
      <Footer />
    </div>
  );
}
