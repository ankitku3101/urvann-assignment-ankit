import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.urvann.com",
      },
    ],
  },
};

export default nextConfig;
