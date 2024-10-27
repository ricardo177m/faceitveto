import Link from "next/link";

const OtherFeaturesSection = () => {
  return (
    <section className="mt-6 flex flex-col">
      <h2 className="mb-4 text-2xl font-bold">Other Features</h2>
      <p className="mb-2">
        <Link
          href="/finder"
          className="underline transition-colors hover:text-primary"
        >
          FACEIT Account Finder
        </Link>
      </p>
      <p>
        <Link
          href="/premade"
          className="underline transition-colors hover:text-primary"
        >
          Premade Win Rate
        </Link>
      </p>
    </section>
  );
};

export default OtherFeaturesSection;
