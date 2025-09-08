/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove basePath and assetPrefix for GitHub Pages
  // GitHub Pages serves from root, not from a subdirectory
}

module.exports = nextConfig
