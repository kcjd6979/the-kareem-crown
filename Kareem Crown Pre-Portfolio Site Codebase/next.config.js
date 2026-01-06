/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: 'output: export' was removed to revert to standard Next.js server-based deployment on Vercel.
  // This is the critical change to fix the asset loading and JS hydration issues.
};

module.exports = nextConfig;
