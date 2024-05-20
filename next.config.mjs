/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-20 17:10:28
 * @Description:
 */
/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';

const isProd = process.env.NODE_ENV === 'production';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProd,
});

const nextConfig = {
  output: 'standalone',
  compiler: {
    removeConsole: isProd,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPWA(nextConfig);
