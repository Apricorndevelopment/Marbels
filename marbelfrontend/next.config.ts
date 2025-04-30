import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.stonelivestock.com',
        pathname: '/uploads/**', // 👈 adjust this based on your image URL path
      },
      {
        protocol: 'https',
        hostname: 'backend.stonelivestock.com',
        pathname: '/storage/**', // 👈 adjust this based on your image URL path
      },
    ],
  },
};

export default nextConfig;
