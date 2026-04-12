import { PrismaClient } from "@prisma/client";
import { FaqClient } from "./FaqClient";

const prisma = new PrismaClient();

export const revalidate = 60; // Cache optionally

export default async function FaqPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: 'asc' }
  });

  return <FaqClient faqs={faqs} />;
}
