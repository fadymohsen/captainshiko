import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function updatePolicyAction(slug: string, formData: FormData) {
  'use server';
  
  try {
    await prisma.policy.upsert({
      where: { slug },
      update: {
        titleEn: formData.get('titleEn') as string,
        titleAr: formData.get('titleAr') as string,
        contentEn: formData.get('contentEn') as string,
        contentAr: formData.get('contentAr') as string,
      },
      create: {
        slug,
        titleEn: formData.get('titleEn') as string,
        titleAr: formData.get('titleAr') as string,
        contentEn: formData.get('contentEn') as string,
        contentAr: formData.get('contentAr') as string,
      }
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    console.error("Failed to update Policy:", error);
    throw error;
  }
  
  redirect('/admin/dashboard/policies');
}

export default async function EditPolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let policy = await prisma.policy.findUnique({ where: { slug } });
  
  // If not found (new), provide empty defaults
  if (!policy) {
    policy = {
      id: 'new',
      slug,
      titleEn: '',
      titleAr: '',
      contentEn: '',
      contentAr: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  const actionWithSlug = updatePolicyAction.bind(null, slug);

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-black mb-8 tracking-tight capitalize">Edit Policy: {slug}</h1>
      
      <form action={actionWithSlug} className="flex flex-col gap-8 bg-white/5 border border-white/10 p-8 rounded-3xl">
        
        <div className="grid lg:grid-cols-2 gap-8 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-4">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">English Content</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Title</span>
              <input type="text" name="titleEn" defaultValue={policy.titleEn} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" required />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Content</span>
              <textarea name="contentEn" defaultValue={policy.contentEn} className="bg-background/50 border border-white/10 p-3 rounded-xl min-h-[400px] focus:border-accent outline-none font-mono text-sm leading-relaxed" required />
            </label>
          </div>
          
          <div className="flex flex-col gap-4 dir-rtl text-right">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">المحتوى العربي</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">العنوان</span>
              <input type="text" name="titleAr" defaultValue={policy.titleAr} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none text-right" required />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">المحتوى</span>
              <textarea name="contentAr" defaultValue={policy.contentAr} className="bg-background/50 border border-white/10 p-3 rounded-xl min-h-[400px] focus:border-accent outline-none text-right font-mono text-sm leading-relaxed" required />
            </label>
          </div>
        </div>

        <div className="pt-6 flex gap-4">
          <button type="submit" className="bg-accent hover:bg-accent-light text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg flex-1 md:flex-none">
            Save Policy
          </button>
          <a href="/admin/dashboard/policies" className="border border-white/10 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white/5 transition-all text-center flex-1 md:flex-none">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
