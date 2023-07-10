import { Inter } from "next/font/google";

import TopBar from "@/components/ui/TopBar";
import { siteConfig } from "@/config/site";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
          <SkeletonTheme baseColor="#24292e" highlightColor="#3f4448">
            {/* @ts-expect-error Async Server Component */}
            <TopBar />
            {children}
          </SkeletonTheme>
        </NextAuthProvider>
      </body>
      <Analytics />
    </html>
  );
}
