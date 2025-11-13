import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@reelo/ui', '@reelo/ui-web'],
  typescript: {
    // ⚠️ Dangerous! Ignores all type errors
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/de34mba3h/image/upload/**',
      },
    ],
  },
};

export default nextConfig;
