import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/nothing',
  assetPrefix: '/nothing/',
  images: { unoptimized: true }
};

export default nextConfig;
