import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../.."),
  transpilePackages: ['@reelo/ui', '@reelo/ui-web', '@reelo/i18n'],
  env: {
    NEXT_PUBLIC_I18N_EXTRA_NAMESPACES: 'client',
  },
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
