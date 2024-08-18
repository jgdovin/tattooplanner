/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/dashboard",
      },
    ];
  },
};

export default nextConfig;
