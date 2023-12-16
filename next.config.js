/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  skipTrailingSlashRedirect: true,
  images: {
    formats: [
      'image/avif',
      'image/webp',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      }, {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      }, {
        protocol: 'https',
        hostname: 'bell1234test.s3.ap-southeast-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'img23.melmod.com',
      }, {
        protocol: 'https',
        hostname: 's.gravatar.com',
      }
    ],
  },

  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
    esmExternals: "loose",
    optimizePackageImports: ['@mui/icons-material', '@mui/material'],
  },
};

module.exports = nextConfig;
