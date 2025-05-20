/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fra1.digitaloceanspaces.com',
      },
      {
        protocol: 'https',
        hostname: 'byqr-backend.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'byqrbucket.blob.core.windows.net',
      }
    ],
    path: '/_next/image',
    formats: ['image/avif', 'image/webp']
  },
  output: 'standalone',
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
});