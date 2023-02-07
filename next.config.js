const { withContentlayer }  = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  experimental: {
    appDir: true,
  },
}

module.exports = withContentlayer(nextConfig)
