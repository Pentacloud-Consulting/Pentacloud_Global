import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip type-checking and linting during production build.
  // The VPS has limited RAM; these checks run locally during development.
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    const WP_IP = process.env.WP_HOSTINGER_IP || '82.180.142.220';
    return {
      beforeFiles: [
        // 1. Any preview request with elementor-preview query parameter -> proxy to Hostinger WP
        {
          source: '/:path*',
          has: [{ type: 'query', key: 'elementor-preview' }],
          destination: `http://${WP_IP}/:path*`,
        },
        // 2. WP Admin routes -> proxy to Hostinger WP
        {
          source: '/wp-admin',
          destination: `http://${WP_IP}/wp-admin`,
        },
        {
          source: '/wp-admin/:path*',
          destination: `http://${WP_IP}/wp-admin/:path*`,
        },
        // 3. WP Content assets (plugins, uploads, themes, elementor css/js) -> proxy to Hostinger WP
        {
          source: '/wp-content/:path*',
          destination: `http://${WP_IP}/wp-content/:path*`,
        },
        // 4. WP Includes core scripts -> proxy to Hostinger WP
        {
          source: '/wp-includes/:path*',
          destination: `http://${WP_IP}/wp-includes/:path*`,
        },
        // 5. WP Login page -> proxy to Hostinger WP
        {
          source: '/wp-login.php',
          destination: `http://${WP_IP}/wp-login.php`,
        },
      ],
    };
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
