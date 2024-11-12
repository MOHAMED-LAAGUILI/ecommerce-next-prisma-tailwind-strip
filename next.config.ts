import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // Increase this value as needed, e.g., '5mb' or '10mb'
    },
  },};

export default nextConfig;
