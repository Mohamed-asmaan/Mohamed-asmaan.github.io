/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Mohamed-asmaan.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Mohamed-asmaan.github.io' : '',
}

module.exports = nextConfig
