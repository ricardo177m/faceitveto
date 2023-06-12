import { Inter } from "next/font/google";

import TopBar from "@/components/ui/TopBar";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { NextAuthProvider } from "@/providers/NextAuthProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={`bg-dark-300 text-white ${inter.className}`}>
        <NextAuthProvider>
          {/* @ts-expect-error Async Server Component */}
          <TopBar />
          {children}
        </NextAuthProvider>
      </body>
      <Analytics />
    </html>
  );
}
