import { PrismaClient } from "@prisma/client";
import { HomeClient } from "./HomeClient";

const prisma = new PrismaClient();

export const revalidate = 60; // optionally cache for 60 seconds

export default async function HomePage() {
  const plans = await prisma.plan.findMany({
    orderBy: { order: 'asc' }
  });

  return <HomeClient dbPlans={plans} />;
}
