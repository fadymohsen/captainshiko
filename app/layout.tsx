import type { Metadata } from "next";
import { Nunito, Geist_Mono, Tajwal } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tajwal = Tajwal({
  variable: "--font-tajwal",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Captain Shiko | Elite Online Fitness Coaching",
  description:
    "Transform your body with Captain Shiko — personalized training programs, nutrition plans, and 1-on-1 online coaching by Mohamed Roshdy.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Captain Shiko | Elite Online Fitness Coaching",
    description:
      "Transform your body with Captain Shiko — personalized training programs, nutrition plans, and 1-on-1 online coaching by Mohamed Roshdy.",
    images: [
      {
        url: "/og-image.jpg",
        width: 800,
        height: 1067,
        alt: "Captain Shiko - Mohamed Roshdy",
      },
    ],
    type: "website",
    siteName: "Captain Shiko",
  },
  twitter: {
    card: "summary_large_image",
    title: "Captain Shiko | Elite Online Fitness Coaching",
    description:
      "Transform your body with Captain Shiko — personalized training programs, nutrition plans, and 1-on-1 online coaching.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${nunito.variable} ${geistMono.variable} ${tajwal.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
