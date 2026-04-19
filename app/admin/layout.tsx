import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel - Coach Mohamed Roshdy',
  description: 'Secure admin panel',
  robots: 'noindex, nofollow', // Ensure admin is hidden from search engines
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30 ltr">
      {children}
    </div>
  );
}
