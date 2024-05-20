/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-20 17:18:36
 * @Description:
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/config/app.config';
import { Layout } from '@/components/layout/Layout';
import '@/styles/index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: 'kasuie',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icons/favicon192.png',
    apple: '/icons/apple-touch.png',
  },
  openGraph: {
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.domain}/icons/favicon64.png`,
        width: 800,
        height: 600,
      },
      {
        url: `${siteConfig.domain}/icons/favicon192.png`,
        width: 1800,
        height: 1600,
        alt: siteConfig.name,
      },
    ],
    locale: 'zh_CN',
    type: 'website',
    url: siteConfig.domain,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
