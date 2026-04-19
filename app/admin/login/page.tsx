import { LoginForm } from "./form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin/dashboard");

  return (
    <div className="flex items-center justify-center min-h-screen relative p-4 bg-background">
      {/* Background Aesthetics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-accent/10 blur-[150px] rounded-full" />
      </div>
      
      <div className="relative z-10 w-full max-w-md bg-background/50 border border-white/10 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-3 tracking-tight">Admin <span className="text-accent">Access</span></h1>
          <p className="text-muted text-sm font-medium tracking-wide">Secure entry beyond this point.</p>
        </div>
        
        <LoginForm />
        
        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <p className="text-xs text-muted/60 tracking-wider">COACH MOHAMED ROSHDY © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
