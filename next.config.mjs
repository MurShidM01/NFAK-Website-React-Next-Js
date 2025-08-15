/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/songs/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
        ],
      },
    ];
  },
  // Ensure audio files are properly served
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(m4a|mp3|wav|ogg)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
