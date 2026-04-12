import prisma from "@/lib/prisma";
import { HomeClient } from "./HomeClient";

export const revalidate = 60; // optionally cache for 60 seconds

export default async function HomePage() {
  const [plans, transformations] = await Promise.all([
    prisma.plan.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    }),
    prisma.transformation.findMany({
      orderBy: { order: 'asc' },
      take: 4
    })
  ]);

  return <HomeClient dbPlans={plans} dbTransformations={transformations} />;
}
