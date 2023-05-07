"use client";

import { useRouter } from "next/navigation";

import useIsMobile from "@/hooks/useIsMobile.hook";

export default function Logo() {
  const router = useRouter();
  const isMobile = useIsMobile();

  return isMobile ? (
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
  );
}
