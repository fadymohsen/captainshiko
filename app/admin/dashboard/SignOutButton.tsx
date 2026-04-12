"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton({ className }: { className?: string }) {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className={className || "w-full py-3 px-4 rounded-xl border border-white/10 text-muted text-sm font-bold tracking-wider hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-colors"}
    >
      Sign Out
    </button>
  );
}
