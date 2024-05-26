/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-26 12:01:30
 * @Description:
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Layout } from '@/components/layout/Layout';
import '@/styles/index.css';
import { AppProviders } from '@/providers';
import { getConfig } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata() {

  const siteConfig = await getConfig('config.json');

  return {
    title: siteConfig.name,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    manifest: '/api/manifest',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/icons/favicon192.png',
      apple: '/icons/apple-touch.png',
    },
  } satisfies Metadata;
}

export default async function RootLayout({
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
