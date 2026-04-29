import prisma from "@/lib/prisma";
import { HomeClient } from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [plans, transformations, reviews, setting] = await Promise.all([
    prisma.plan.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    }),
    prisma.transformation.findMany({
      orderBy: { order: 'asc' },
      take: 4
    }),
    prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.setting.findUnique({
      where: { key: "showReviewsPage" }
    })
  ]);

  const showReviewsPage = setting?.value === "true";
  const homeReviews = reviews.filter((r: any) => r.showOnHome).slice(0, 10);

  return (
    <HomeClient 
      dbPlans={plans} 
      dbTransformations={transformations} 
      dbReviews={homeReviews} 
      showReviewsPage={showReviewsPage} 
    />
  );
}
