"use client";

import { useRouter } from "next/navigation";

import useIsMobile from "@/hooks/useIsMobile.hook";

export default function TopBar() {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <div className="w-full border-b border-b-dark-600 h-16 px-4 mb-4 flex flex-row gap-4 items-center">
      {isMobile ? (
        <img
          key={"mobile-logo"}
          onClick={() => router.push("/")}
          src="/images/icon.svg"
          alt="FVETO"
          className="w-8 py-2 mr-1 cursor-pointer"
        />
      ) : (
        <img
          key={"desktop-logo"}
          onClick={() => router.push("/")}
          src="/images/faceitveto.svg"
          alt="FACEIT VETO"
          className="w-44 py-4 mr-2 cursor-pointer"
        />
      )}
      <div>
        <span className="py-1 px-2 rounded-md bg-dark-600 text-sm">Beta</span>
      </div>
    </div>
  );
}
