import { getTransformations } from "./actions";
import { TransformationList } from "./TransformationList";
import Link from "next/link";

export default async function AdminTransformationsPage() {
  const transformations = await getTransformations();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">Transformations</h1>
          <p className="text-muted text-sm font-medium">Add, reorder, and manage student transformation success stories.</p>
        </div>
        
        <Link 
          href="/admin/dashboard/transformations/new" 
          className="bg-accent text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-accent-light transition-all shadow-lg shadow-accent/20"
        >
          Add Transformation
        </Link>
      </div>

      <TransformationList initialItems={transformations} />
    </div>
  );
}
