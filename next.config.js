/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:id',
        destination: '/api/redirect',
      },
    ]
  },
}

module.exports = nextConfig
