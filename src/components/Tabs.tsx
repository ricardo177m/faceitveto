"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabsProps {
  tabs: {
    label: string;
    href: string;
  }[];
}

export default function Tabs({ tabs }: TabsProps) {
  const pathname = usePathname();

  return (
    <section className="border-b border-b-dark-700">
      <div className="flex gap-4">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            href={tab.href}
            className={`px-4 py-2 font-semibold ${pathname === tab.href ? "text-white" : "text-dark-900"}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
