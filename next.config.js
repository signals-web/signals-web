/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['framer-motion'],
  experimental: {
    esmExternals: true
  }
}

module.exports = nextConfig 