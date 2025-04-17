import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
        pathname: '/storage/**',
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/dashboard/:path*",  // Jo bhi /dashboard ke baad aaye
  //       destination: "/dashboard/admin-dashboard/:path*", // Usko internally /dashboard-app me bhej do
  //     },
  //   ];
  // },
};

export default nextConfig;
