"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useIsMobile } from "@/hooks";

export default function Logo() {
  const router = useRouter();
  const isMobile = useIsMobile();

  return isMobile ? (
    <Image
      key={"mobile-logo"}
      onClick={() => router.push("/")}
      src="/images/icon.svg"
      alt="FVETO"
      className="w-8 py-2 mr-1 cursor-pointer"
      width={300}
      height={300}
    />
  ) : (
    <Image
      key={"desktop-logo"}
      onClick={() => router.push("/")}
      src="/images/faceitveto.svg"
      alt="FACEIT VETO"
      className="w-44 py-4 mr-2 cursor-pointer"
      width={300}
      height={300}
    />
  );
}
