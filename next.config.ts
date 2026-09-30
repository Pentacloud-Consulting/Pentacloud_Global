import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip type-checking and linting during production build.
  // The VPS has limited RAM; these checks run locally during development.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pentacloud.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pentacloudconsulting.com',
        pathname: '/**',
      },
      {
        // WordPress media served from the wp subdomain (Hostinger Shared Hosting)
        protocol: 'https',
        hostname: 'wp.pentacloudconsulting.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
