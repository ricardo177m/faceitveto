import Link from "next/link";

const OtherFeaturesSection = () => {
  const links = [
    {
      label: "FACEIT Finder",
      href: "/finder",
    },
    {
      label: "Premade Win Rate",
      href: "/premade",
    },
    {
      label: "Have We Met",
      href: "/havewemet",
    },
  ];

  return (
    <section className="mt-6 flex flex-col">
      <h2 className="mb-4 text-2xl font-bold">Other Features</h2>
      {links.map((link) => (
        <p key={link.href} className="mb-2">
          <Link
            href={link.href}
            className="underline transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        </p>
      ))}
    </section>
  );
};

export default OtherFeaturesSection;
