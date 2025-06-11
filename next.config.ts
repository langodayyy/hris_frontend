import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignore react-joyride during the build process
      config.resolve.alias["react-joyride"] = false;
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true
};

export default nextConfig;
