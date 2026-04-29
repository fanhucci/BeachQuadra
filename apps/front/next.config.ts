import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, 
  },/* config options here */
  transpilePackages:['@app/shared']
};

export default nextConfig;
