import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        key={"mobile-logo"}
        src="/images/icon.svg"
        alt="FVETO"
        className="mr-1 w-8 cursor-pointer py-2 md:hidden"
        width={300}
        height={300}
      />
      <Image
        key={"desktop-logo"}
        src="/images/faceitveto.svg"
        alt="FACEIT VETO"
        className="mr-2 hidden w-44 cursor-pointer py-4 md:block"
        width={300}
        height={300}
        priority
      />
    </Link>
  );
}
