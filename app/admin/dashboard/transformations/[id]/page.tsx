import prisma from "@/lib/prisma";
import { TransformationForm } from "./TransformationForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditTransformationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  
  let transformation = null;

  if (id !== "new") {
    transformation = await prisma.transformation.findUnique({
      where: { id }
    });
    if (!transformation) notFound();
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
       <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/transformations" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-muted transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            {id === "new" ? "New Transformation" : "Edit Transformation"}
          </h1>
          <p className="text-muted text-sm font-medium">Update student story and results.</p>
        </div>
      </div>

      <TransformationForm transformation={transformation} />
    </div>
  );
}
