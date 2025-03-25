import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "source.unsplash.com",
				pathname: "/**",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/dashboard/grupos_de_partida",
				destination: "/dashboard/grupos_de_partida/subgrupos",
				permanent: true,
			},
			{
				source: "/dashboard/configuracion",
				destination: "/dashboard/configuracion/general",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
