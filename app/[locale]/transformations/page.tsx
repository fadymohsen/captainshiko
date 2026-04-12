import prisma from "@/lib/prisma";
import { TransformationsClient } from "./TransformationsClient";

export const revalidate = 60;

export default async function TransformationsPage() {
  const transformations = await prisma.transformation.findMany({
    orderBy: { order: 'asc' }
  });

  return <TransformationsClient dbTransformations={transformations} />;
}
