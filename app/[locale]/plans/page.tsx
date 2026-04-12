import prisma from "@/lib/prisma";
import { PlansClient } from "./PlansClient";

export const revalidate = 60; // optionally cache for 60 seconds

export default async function PlansPage() {
  const plans = await prisma.plan.findMany({
    orderBy: { order: 'asc' }
  });

  return <PlansClient plans={plans} />;
}
