import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function updateFaqAction(id: string, formData: FormData) {
  'use server';
  
  try {
    await prisma.fAQ.update({
      where: { id },
      data: {
        questionEn: formData.get('questionEn') as string,
        answerEn: formData.get('answerEn') as string,
        questionAr: formData.get('questionAr') as string,
        answerAr: formData.get('answerAr') as string,
        order: parseInt(formData.get('order') as string) || 0,
      }
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    console.error("Failed to update FAQ:", error);
    throw error;
  }
  
  redirect('/admin/dashboard/faqs');
}

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // If 'new', we could create one or show an empty form
  // For simplicity, handle new via a separate Create Action or here
  let faq;
  if (id === 'new') {
    faq = { id: 'new', questionEn: '', answerEn: '', questionAr: '', answerAr: '', order: 0 };
  } else {
    faq = await prisma.fAQ.findUnique({ where: { id } });
  }

  if (!faq) return <div>FAQ not found</div>;

  const actionWithId = id === 'new' 
    ? async function createFaqAction(formData: FormData) {
        'use server';
        await prisma.fAQ.create({
          data: {
            questionEn: formData.get('questionEn') as string,
            answerEn: formData.get('answerEn') as string,
            questionAr: formData.get('questionAr') as string,
            answerAr: formData.get('answerAr') as string,
            order: parseInt(formData.get('order') as string) || 0,
          }
        });
        revalidatePath('/', 'layout');
        redirect('/admin/dashboard/faqs');
      }
    : updateFaqAction.bind(null, id);


  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-black mb-8 tracking-tight">{id === 'new' ? 'New FAQ' : 'Edit FAQ'}</h1>
      
      <form action={actionWithId} className="flex flex-col gap-8 bg-white/5 border border-white/10 p-8 rounded-3xl">
        
        <div className="grid md:grid-cols-2 gap-8 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-4">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">English Content</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Question</span>
              <input type="text" name="questionEn" defaultValue={faq.questionEn} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" required />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Answer</span>
              <textarea name="answerEn" defaultValue={faq.answerEn} className="bg-background/50 border border-white/10 p-3 rounded-xl min-h-[120px] focus:border-accent outline-none" required />
            </label>
          </div>
          
          <div className="flex flex-col gap-4 dir-rtl text-right">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">المحتوى العربي</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">السؤال</span>
              <input type="text" name="questionAr" defaultValue={faq.questionAr} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none text-right" required />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">الإجابة</span>
              <textarea name="answerAr" defaultValue={faq.answerAr} className="bg-background/50 border border-white/10 p-3 rounded-xl min-h-[120px] focus:border-accent outline-none text-right" required />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 w-32">
            <span className="text-sm font-bold text-muted">Display Order</span>
            <input type="number" name="order" defaultValue={faq.order} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" />
          </label>
        </div>

        <div className="pt-6 flex gap-4">
          <button type="submit" className="bg-accent hover:bg-accent-light text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg flex-1 md:flex-none">
            {id === 'new' ? 'Create FAQ' : 'Save Changes'}
          </button>
          <a href="/admin/dashboard/faqs" className="border border-white/10 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white/5 transition-all text-center flex-1 md:flex-none">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
