/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['platform-lookaside.fbsbx.com','avatar.vercel.sh'], formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@tremor/react',"mongoose"],
    appDir: true,
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
