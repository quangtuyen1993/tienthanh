/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
  },
  experimental: {
    serverComponentsExternalPackages: ['@tremor/react',"mongoose"],
    appDir: true,
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
