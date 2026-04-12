import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function PoliciesPage() {
  const policies = await prisma.policy.findMany();

  const standardPolicies = ['privacy', 'refund', 'terms'];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black mb-2 tracking-tight">Policies</h1>
        <p className="text-muted text-sm font-medium">Manage your site's legal and procedural policies.</p>
      </div>

      <div className="grid gap-6">
        {standardPolicies.map((slug) => {
          const policy = policies.find(p => p.slug === slug);
          const displayName = slug === 'terms' ? 'Terms of Service' : slug === 'refund' ? 'Refund Policy' : 'Privacy Policy';
          
          return (
            <div key={slug} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg mb-1">{displayName}</h3>
                <p className="text-sm text-muted">
                  {policy ? `Last updated: ${new Date(policy.updatedAt).toLocaleDateString()}` : 'Not created yet. Click edit to write.'}
                </p>
              </div>
              <a href={`/admin/dashboard/policies/${slug}`} className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-colors">
                {policy ? 'Edit Policy' : 'Create Policy'}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
