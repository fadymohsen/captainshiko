'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveTransformation } from '../actions';
import Image from 'next/image';
import Link from 'next/link';

export function TransformationForm({ transformation }: { transformation: any }) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(transformation?.imagePath || '');
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await saveTransformation(formData);

    if (res.success) {
      router.push('/admin/dashboard/transformations');
      router.refresh();
    } else {
      alert(res.error || 'Failed to save');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <input type="hidden" name="id" value={transformation?.id || ''} />
      <input type="hidden" name="currentImagePath" value={transformation?.imagePath || ''} />

      {/* Image Upload */}
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center text-center">
        <div className="relative w-48 h-64 rounded-3xl overflow-hidden bg-white/5 mb-6 border border-white/10 shadow-2xl">
          {imagePreview ? (
            <Image src={imagePreview} alt="Preview" fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-muted">No Image</div>
          )}
        </div>
        <input 
          type="file" 
          name="image" 
          accept="image/*" 
          onChange={handleImageChange}
          required={!transformation}
          className="text-xs text-muted file:bg-white/10 file:border-0 file:px-4 file:py-2 file:rounded-full file:text-white file:font-bold file:mr-4 file:cursor-pointer hover:file:bg-white/20 transition-all"
        />
        <p className="mt-4 text-[10px] uppercase font-black tracking-widest text-muted/50">Vertical aspect ratio (3:4) recommended</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* English Details */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-6">
          <h2 className="text-xl font-black uppercase tracking-widest text-accent mb-4">English Details</h2>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Name</label>
            <input name="nameEn" defaultValue={transformation?.nameEn} required className="w-full bg-background border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent" placeholder="e.g. Ahmed M." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Results Summary</label>
            <textarea name="resultEn" defaultValue={transformation?.resultEn} required className="w-full bg-background border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent min-h-[120px]" placeholder="Summary of results..." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Duration</label>
            <input name="durationEn" defaultValue={transformation?.durationEn} className="w-full bg-background border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent" placeholder="e.g. 12 Weeks" />
          </div>
        </div>

        {/* Arabic Details */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-6" dir="rtl">
          <h2 className="text-xl font-black uppercase tracking-widest text-accent mb-4">التفاصيل بالعربي</h2>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted mr-1">الإسم</label>
            <input name="nameAr" defaultValue={transformation?.nameAr} required className="w-full bg-background border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent" placeholder="مثلاً: أحمد م." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted mr-1">ملخص النتائج</label>
            <textarea name="resultAr" defaultValue={transformation?.resultAr} required className="w-full bg-background border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent min-h-[120px]" placeholder="اكتب النتايج هنا..." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted mr-1">المدة</label>
            <input name="durationAr" defaultValue={transformation?.durationAr} className="w-full bg-background border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent" placeholder="مثلاً: ١٢ أسبوع" />
          </div>
        </div>
      </div>

      {/* Common Details */}
      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
        <div className="max-w-xs space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Student Age (Optional)</label>
            <input type="number" name="age" defaultValue={transformation?.age} className="w-full bg-background border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent" placeholder="e.g. 28" />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link href="/admin/dashboard/transformations" className="px-10 py-5 rounded-2xl border border-white/10 font-black uppercase tracking-widest hover:bg-white/5 transition-all">Cancel</Link>
        <button type="submit" disabled={loading} className="px-12 py-5 rounded-2xl bg-accent text-white font-black uppercase tracking-widest hover:bg-accent-light transition-all shadow-xl shadow-accent/20 disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Transformation'}
        </button>
      </div>
    </form>
  );
}
