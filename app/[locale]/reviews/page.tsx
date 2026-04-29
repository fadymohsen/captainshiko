import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ReviewsClient } from "./ReviewsClient";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  // Check if page is enabled
  const setting = await prisma.setting.findUnique({
    where: { key: "showReviewsPage" },
  });

  const isEnabled = setting?.value === "true";

  if (!isEnabled) {
    notFound();
  }

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
