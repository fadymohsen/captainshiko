import type { Metadata } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "./scroll-to-top";

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
  metadataBase: new URL("https://www.coachmohamedroshdy.com"),
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
    url: "https://www.coachmohamedroshdy.com",
    images: [
      {
        url: "https://www.coachmohamedroshdy.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coach Mohamed Roshdy – Captain Shiko",
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
    images: ["https://www.coachmohamedroshdy.com/og-image.jpg"],
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
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
