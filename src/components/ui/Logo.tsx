import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        key={"mobile-logo"}
        src="/images/icon.svg"
        alt="FVETO"
        className="w-8 py-2 mr-1 cursor-pointer md:hidden"
        width={300}
        height={300}
      />
      <Image
        key={"desktop-logo"}
        src="/images/faceitveto.svg"
        alt="FACEIT VETO"
        className="w-44 py-4 mr-2 cursor-pointer hidden md:block"
        width={300}
        height={300}
        priority
      />
    </Link>
  );
}
