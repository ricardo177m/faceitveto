import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
await jiti.import("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.faceit-cdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "distribution.faceit-cdn.net",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 60 * 60 * 12,
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
};

export default nextConfig;
