'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;

    try {
      const res = await signIn('credentials', {
        redirect: false,
        password,
      });

      if (res?.error) {
        setError('Invalid password');
      } else {
        router.push('/admin/dashboard');
        router.refresh(); // Ensure the layout securely recalculates
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium text-center">
          {error}
        </div>
      )}
      
      {/* Password Only Login */}

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest font-bold text-muted ml-1">Password</label>
        <input
          type="password"
          name="password"
          required
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent focus:bg-white/10 transition-all"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-accent text-white font-black uppercase tracking-widest rounded-2xl py-4 hover:bg-accent-light active:scale-[0.98] transition-all shadow-[0_10px_40px_rgba(165,34,34,0.3)] hover:shadow-[0_10px_50px_rgba(165,34,34,0.5)] disabled:opacity-50 disabled:pointer-events-none"
      >
        {loading ? 'Authenticating...' : 'Sign In'}
      </button>
    </form>
  );
}
