import { PrismaClient } from "@prisma/client";
import { Navbar } from "../../../navbar";
import { Footer } from "../../../footer";
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

      <main className="flex-grow pt-32 pb-20 relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="mb-12 border-b border-white/10 pb-8">
            <span className="text-sm text-accent-light font-bold tracking-wider uppercase mb-2 block">
              {locale === "en" ? "Legal Information" : "معلومات قانونية"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">{title}</h1>
            <p className="text-sm text-muted mt-4">
              {locale === "en" ? "Last updated: " : "آخر تحديث: "}
              {new Date(policy.updatedAt).toLocaleDateString(locale === "en" ? 'en-US' : 'ar-EG')}
            </p>
          </div>

          <div 
            className="prose prose-invert prose-lg max-w-none text-muted mb-20"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
