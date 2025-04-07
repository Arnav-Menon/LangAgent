/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }

    return config
  },
  env: {
    LOGIN_REQUIRED: process.env.LOGIN_REQUIRED,
  },
}

module.exports = nextConfig
