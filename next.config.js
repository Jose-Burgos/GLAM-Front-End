/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/505x556',
      },
      {
        protocol: 'https',
        hostname: 's1.eestatic.com',
        port: '',
        pathname: '/2021/11/10/actualidad/626198188_214456908_1706x960.jpg',
      }
      ,
      {
        protocol: 'https',
        hostname: 'mir-s3-cdn-cf.behance.net',
        port: '',
        pathname: '/project_modules/hd/79b5f558303657.5a09eafeaf888.jpg',
      }
    ],
  },
};

module.exports = nextConfig;