import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PRIVATE_API_URL?.replace(/\/$/, '');

    if (!apiBaseUrl) {
      return [];
    }

    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
