import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: false,

	images: {
		domains: [
			'gamek.mediacdn.vn',
			'tiki.vn',
			'www.youtube.com',
			'firebasestorage.googleapis.com',
			'jpesrdrgrcqjeqavqxrj.supabase.co',
			'frontend.tikicdn.com',
			'salt.tikicdn.com',
			'images.remotePatterns',
		],
	},
};

export default nextConfig;
