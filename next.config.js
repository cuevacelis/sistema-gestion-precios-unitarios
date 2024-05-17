/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/dashboard/presuspuestos",
  //       destination: "/dashboard/presupuestos",
  //       permanent: true,
  //     },
  //   ];
  // },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")();

module.exports =
  process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;
