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
      <p className="mb-2">
        <Link
          href="/premade"
          className="underline transition-colors hover:text-primary"
        >
          Premade Win Rate
        </Link>
      </p>
      <p className="mb-2">
        <Link
          href="/teammates"
          className="underline transition-colors hover:text-primary"
        >
          Teammates
        </Link>
      </p>
      <p className="mb-2">
        <Link
          href="/together"
          className="underline transition-colors hover:text-primary"
        >
          Matches Together
        </Link>
      </p>
    </section>
  );
};

export default OtherFeaturesSection;
