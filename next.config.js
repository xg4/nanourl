/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
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
