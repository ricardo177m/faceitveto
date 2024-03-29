import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { config } from "@/config/config";
import { AuthContextProvider } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";

import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import { SkeletonTheme } from "react-loading-skeleton";

import NewsPopup from "@/components/NewsPopup";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: config.title,
  description: config.description,
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
        <AuthContextProvider>
          <SkeletonTheme baseColor="#24292e" highlightColor="#3f4448">
            {/* @ts-expect-error Async Server Component */}
            <NavBar />
            {children}
            <NewsPopup />
          </SkeletonTheme>
        </AuthContextProvider>
      </body>
      <Analytics />
    </html>
  );
}
