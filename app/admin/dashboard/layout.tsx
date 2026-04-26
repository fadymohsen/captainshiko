import { auth } from "@/auth";
import MobileNav from "./MobileNav";
import SignOutButton from "./SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Placeholder */}
      <aside className="w-64 border-r border-white/5 bg-background/50 backdrop-blur-xl flex flex-col p-6 hidden md:flex">
        <div className="mb-10">
          <h2 className="text-xl font-black">Admin<span className="text-accent">Panel</span></h2>
          <p className="text-xs text-muted mt-1 uppercase tracking-widest pl-0.5">Welcome, Coach Mohamed Roshdy</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-grow">
          <a href="/admin/dashboard" className="py-3 px-4 rounded-xl bg-white/5 text-sm font-bold tracking-wider hover:bg-white/10 transition-colors">Dashboard</a>
          <a href="/admin/dashboard/plans" className="py-3 px-4 rounded-xl text-muted text-sm font-bold tracking-wider hover:bg-white/5 hover:text-foreground transition-colors">Services & Plans</a>
          <a href="/admin/dashboard/transformations" className="py-3 px-4 rounded-xl text-muted text-sm font-bold tracking-wider hover:bg-white/5 hover:text-foreground transition-colors">Transformations</a>
          <a href="/admin/dashboard/faqs" className="py-3 px-4 rounded-xl text-muted text-sm font-bold tracking-wider hover:bg-white/5 hover:text-foreground transition-colors">FAQs</a>
          <a href="/admin/dashboard/coupons" className="py-3 px-4 rounded-xl text-muted text-sm font-bold tracking-wider hover:bg-white/5 hover:text-foreground transition-colors">Coupons</a>
          <a href="/admin/dashboard/policies" className="py-3 px-4 rounded-xl text-muted text-sm font-bold tracking-wider hover:bg-white/5 hover:text-foreground transition-colors">Policies</a>
          <a href="/admin/dashboard/purchases" className="py-3 px-4 rounded-xl text-muted text-sm font-bold tracking-wider hover:bg-white/5 hover:text-foreground transition-colors">Purchases</a>
          <a href="/admin/dashboard/reviews" className="py-3 px-4 rounded-xl text-muted text-sm font-bold tracking-wider hover:bg-white/5 hover:text-foreground transition-colors">Reviews</a>
        </nav>

        <div className="mt-auto">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        {/* Mobile Header (Interactive) */}
        <MobileNav />
        
        {children}
      </main>
    </div>
  );
}
