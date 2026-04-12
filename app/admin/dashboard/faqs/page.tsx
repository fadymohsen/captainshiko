import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function FaqsPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">FAQs</h1>
          <p className="text-muted text-sm font-medium">Manage frequently asked questions.</p>
        </div>
        <a href="/admin/dashboard/faqs/new" className="bg-accent text-white font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-accent-light transition-all shadow-lg text-sm">
          Add New
        </a>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {faqs.length === 0 ? (
          <div className="p-10 text-center text-muted font-medium">No FAQs added yet.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-6 hover:bg-white/[0.02] transition-colors flex justify-between items-center group">
                <div>
                  <h3 className="font-bold text-lg mb-1">{faq.questionEn}</h3>
                  <p className="text-sm text-muted line-clamp-1">{faq.answerEn}</p>
                </div>
                <a href={`/admin/dashboard/faqs/${faq.id}`} className="opacity-0 group-hover:opacity-100 bg-white/10 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-all hover:bg-white/20">
                  Edit
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
