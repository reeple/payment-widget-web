/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'mono-public-bucket.s3.eu-west-2.amazonaws.com'],
  },
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
