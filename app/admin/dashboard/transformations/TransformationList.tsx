'use client';

import { useState } from 'react';
import { Reorder } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { updateTransformationOrder, deleteTransformation } from './actions';
import { useRouter } from 'next/navigation';

export function TransformationList({ initialItems }: { initialItems: any[] }) {
  const [items, setItems] = useState(initialItems);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleReorder = async (newOrder: any[]) => {
    setItems(newOrder);
    setSaving(true);
    const ids = newOrder.map(item => item.id);
    await updateTransformationOrder(ids);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this transformation?')) {
      const res = await deleteTransformation(id);
      if (res.success) {
        setItems(items.filter(i => i.id !== id));
        router.refresh();
      } else {
        alert(res.error || 'Failed to delete');
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
        <span className="text-xs font-bold text-muted uppercase tracking-widest">
          {items.length} Transformations Found
        </span>
        {saving && (
           <span className="text-[10px] text-accent font-black animate-pulse">SAVING ORDER...</span>
        )}
      </div>

      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="flex flex-col gap-4">
        {items.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            className="bg-background/50 border border-white/10 rounded-2xl p-4 flex items-center gap-6 cursor-grab active:cursor-grabbing hover:border-white/20 transition-colors"
          >
            <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
              <Image
                src={item.imagePath}
                alt={item.nameEn}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-grow">
               <h3 className="font-bold text-lg">{item.nameEn} <span className="text-muted text-sm font-medium ml-2">({item.age}y)</span></h3>
               <p className="text-xs text-muted mt-1 line-clamp-1 italic">"{item.resultEn}"</p>
               <div className="mt-3 flex gap-2">
                  <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded bg-white/5 text-muted tracking-tighter">EN: {item.durationEn}</span>
                  <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded bg-white/5 text-muted tracking-tighter">AR: {item.durationAr}</span>
               </div>
            </div>

            <div className="flex gap-2">
               <Link 
                 href={`/admin/dashboard/transformations/${item.id}`}
                 className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-muted hover:text-foreground transition-colors"
               >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
               </Link>
               <button 
                 onClick={() => handleDelete(item.id)}
                 className="p-3 rounded-xl bg-red-500/5 hover:bg-red-500/10 text-red-500/50 hover:text-red-500 transition-colors"
               >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
               </button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
