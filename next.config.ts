import type { NextConfig } from "next"
import type { Configuration } from "webpack"

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
        },
      }
    }

    return config
  },

  env: {
    LOGIN_REQUIRED: process.env.LOGIN_REQUIRED,
  },
}

export default nextConfig
