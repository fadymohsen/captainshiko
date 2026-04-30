import prisma from "@/lib/prisma";
import { HomeClient } from "./HomeClient";

export const revalidate = 60;

export default async function HomePage() {
  let plans: any[] = [];
  let transformations: any[] = [];

  try {
    [plans, transformations] = await Promise.all([
      prisma.plan.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' }
      }),
      prisma.transformation.findMany({
        orderBy: { order: 'asc' },
        take: 4
      })
    ]);
  } catch {
    // DB unavailable — render page with empty data rather than a 500
  }

  return <HomeClient dbPlans={plans} dbTransformations={transformations} />;
}
