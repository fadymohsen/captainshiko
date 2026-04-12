import prisma from "@/lib/prisma";
import { AboutClient } from "./AboutClient";

export const revalidate = 60;

export default async function AboutPage() {
  const transformations = await prisma.transformation.findMany({
    orderBy: { order: 'asc' },
    take: 3
  });

  return <AboutClient dbTransformations={transformations} />;
}
