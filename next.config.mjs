/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      {
        source: '/courses',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
