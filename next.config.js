/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard/presuspuestos",
        destination: "/dashboard/presupuestos",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
