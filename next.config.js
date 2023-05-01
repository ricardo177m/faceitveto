/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["assets.faceit-cdn.net", "distribution.faceit-cdn.net"],
  },
};

module.exports = nextConfig;
