import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@rainbow-me/rainbowkit', 'wagmi', 'viem'],
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {} 
};

export default nextConfig;
