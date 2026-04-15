import { PrismaClient } from "@prisma/client";
import { Navbar } from "../../../navbar";
import { Footer } from "../../../footer";
import PolicyContent from "./PolicyContent";
import Link from "next/link";

const prisma = new PrismaClient();

export const revalidate = 60;

export default async function PolicyPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  
  const policy = await prisma.policy.findUnique({
    where: { slug }
  });

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
