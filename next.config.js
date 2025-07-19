/** @type {import('next').NextConfig} */
const nextConfig = {
  // transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config, { isServer }) => {
    // Fix for React Three Fiber SSR issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },
  // experimental: {
  //   esmExternals: 'loose',
  // },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname : '**'
      },
    ],
  },
};

module.exports = nextConfig;
