import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
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

export default withNextIntl(nextConfig);
