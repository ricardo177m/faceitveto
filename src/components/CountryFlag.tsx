import NextImageWithFallback from "./ui/NextImageWithFallback";

interface CountryFlagProps {
  country?: string;
  className?: string;
  size?: number;
}

export default function CountryFlag({
  country,
  className,
  size,
}: CountryFlagProps) {
  return (
    <NextImageWithFallback
      fallbackSrc="/assets/countries/unknown.svg"
      src={`/assets/countries/${country?.toLowerCase()}.svg`}
      alt={`${country?.toUpperCase()} flag`}
      title={`${country?.toUpperCase()} flag`}
      width={size || 16}
      height={size || 16}
      className={`${className} h-4 min-w-[1.5rem]`}
    />
  );
}
