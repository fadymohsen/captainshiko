import { PrismaClient } from "@prisma/client";
import { PlansClient } from "./PlansClient";

const prisma = new PrismaClient();

export const revalidate = 60; // optionally cache for 60 seconds

export default async function PlansPage() {
  const plans = await prisma.plan.findMany({
    orderBy: { order: 'asc' }
  });

  return <PlansClient plans={plans} />;
}
