/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  async rewrites() {
    return [{ source: '/index.html', destination: '/' }];
  },
};
export default nextConfig;
