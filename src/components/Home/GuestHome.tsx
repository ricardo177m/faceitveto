import Image from "next/image";

import OtherFeaturesSection from "../OtherFeaturesSection";
import Search from "../Search";

export default function GuestHome() {
  return (
    <main className="mx-auto max-w-6xl">
      <div className="my-32 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 rounded-lg bg-dark-500 px-8 py-12 shadow-xl">
          <Image
            src="/images/faceitveto.svg"
            alt="F-Veto Logo"
            width={300}
            height={42}
            priority
          />
          <div className="flex w-full max-w-96 flex-col gap-2">
            <p className="text-lg text-gray-200">Search for a player</p>
            <Search />
          </div>
        </div>
      </div>
      <OtherFeaturesSection />
    </main>
  );
}
