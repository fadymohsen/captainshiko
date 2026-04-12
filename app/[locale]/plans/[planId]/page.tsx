import { PrismaClient } from "@prisma/client";
import { PlanDetailClient } from "./PlanDetailClient";
import { Navbar } from "../../../navbar";
import { Footer } from "../../../footer";

const prisma = new PrismaClient();

export const revalidate = 60;

export default async function PlanDetailPage({ params }: { params: Promise<{ locale: string, planId: string }> }) {
  const { locale, planId } = await params;
  const plan = await prisma.plan.findUnique({
    where: { slug: planId }
  });

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
