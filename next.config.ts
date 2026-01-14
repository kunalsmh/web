import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'instagram.fixc1-8.fna.fbcdn.net',
      },
    ],
  },
};

export default nextConfig;
