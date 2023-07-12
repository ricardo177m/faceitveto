import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["assets.faceit-cdn.net", "distribution.faceit-cdn.net"],
    minimumCacheTTL: 60 * 60 * 12,
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
