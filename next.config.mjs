/** @type {import('next').NextConfig} */
import nextPwa from 'next-pwa'

const nextConfig = {
  output: "export",
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true,      // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
};

// Export the combined configuration for Next.js with PWA support
export default nextConfig
