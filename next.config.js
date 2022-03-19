/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BE_URL: process.env.BE_URL,
  },
  images: {
    domains: ["tailwindui.com", "images.unsplash.com", "localhost"],
  },
};

module.exports = nextConfig;
