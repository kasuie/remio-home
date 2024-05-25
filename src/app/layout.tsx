/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-24 16:47:52
 * @Description:
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from '../config/config';
import { Layout } from '@/components/layout/Layout';
import '@/styles/index.css';
import { AppProviders } from '@/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icons/favicon192.png',
    apple: '/icons/apple-touch.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} mio-scroll overflow-y-auto`}>
        <AppProviders>
          <Layout>{children}</Layout>
        </AppProviders>
      </body>
    </html>
  );
}
