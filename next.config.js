/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ["assets.faceit-cdn.net", "distribution.faceit-cdn.net"],
    minimumCacheTTL: 60 * 60 * 12,
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
