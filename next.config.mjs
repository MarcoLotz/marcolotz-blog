/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pure static export: the site is served as flat files from Cloudflare Pages.
  output: 'export',
  reactStrictMode: true,
  // No image-optimization server exists on a static host.
  images: { unoptimized: true },
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
