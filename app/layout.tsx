import type { Metadata } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Coach Mohamed Roshdy | Elite Online Fitness Coaching",
  description:
    "Transform your body with Coach Mohamed Roshdy — personalized training programs, nutrition plans, and 1-on-1 online coaching.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Coach Mohamed Roshdy | Elite Online Fitness Coaching",
    description:
      "Transform your body with Coach Mohamed Roshdy — personalized training programs, nutrition plans, and 1-on-1 online coaching.",
    images: [
      {
        url: "/og-image.jpg",
        width: 800,
        height: 1067,
        alt: "Coach Mohamed Roshdy",
      },
    ],
    type: "website",
    siteName: "Coach Mohamed Roshdy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coach Mohamed Roshdy | Elite Online Fitness Coaching",
    description:
      "Transform your body with Coach Mohamed Roshdy — personalized training programs, nutrition plans, and 1-on-1 online coaching.",
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
      className={`${nunito.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
