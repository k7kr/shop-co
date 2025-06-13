/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/search',
        destination: '/search',
      },
    ];
  },
};

module.exports = nextConfig;