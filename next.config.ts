import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // Local Development
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
      },
      // Production Domains
      {
        protocol: "https",
        hostname: "ochotierras.cl",
      },
      {
        protocol: "https",
        hostname: "api.ochotierras.cl",
      },
      {
        protocol: "https",
        hostname: "www.ochotierras.cl",
      },
    ],
  },
};

export default nextConfig;
