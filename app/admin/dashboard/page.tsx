export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black mb-2 tracking-tight">Overview</h1>
        <p className="text-muted text-sm font-medium">Welcome to the central command center for your application.</p>
      </div>
      
      {/* Quick Stats Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[50px] -mr-16 -mt-16 group-hover:bg-accent/20 transition-all duration-500" />
          <h3 className="text-muted text-xs font-bold uppercase tracking-widest mb-2">Total Services</h3>
          <p className="text-4xl font-black">5</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all duration-500" />
          <h3 className="text-muted text-xs font-bold uppercase tracking-widest mb-2">Active FAQs</h3>
          <p className="text-4xl font-black">0</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[50px] -mr-16 -mt-16 group-hover:bg-green-500/20 transition-all duration-500" />
          <h3 className="text-muted text-xs font-bold uppercase tracking-widest mb-2">Total Purchases</h3>
          <p className="text-4xl font-black">0</p>
        </div>
      </div>
    </div>
  );
}
