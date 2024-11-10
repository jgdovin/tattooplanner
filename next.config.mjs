/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [],
    staleTimes: {
      dynamic: 0,
      static: 180
    }
  },

};

export default nextConfig;
