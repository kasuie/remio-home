/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-16 15:44:12
 * @Description:
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Layout } from "@/components/layout/Layout";
import { AppProviders } from "@/providers";
import { getConfig } from "@/lib/config";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import "@/styles/index.css";
import StyleRegistry from "@/components/layout/StyleRegistry";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const appConfig = await getConfig("config.json");

  return {
    title: appConfig.name,
    description: appConfig.description,
    keywords: appConfig.keywords,
    manifest: "/api/manifest",
    icons: {
      icon: appConfig.favicon || "/favicon.ico",
      shortcut: "/icons/favicon192.png",
      apple: "/icons/favicon192.png",
    },
    other: { "baidu-site-verification": process.env.BaiduSiteVerify || "" },
  } satisfies Metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appConfig = await getConfig("config.json");
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.className} mio-scroll mio-fonts overflow-y-auto`}
      >
        <AppProviders
          appConfig={appConfig}
          ver={process.env.VERSION || ""}
        >
          <Layout>{children}</Layout>
          <StyleRegistry />
        </AppProviders>
        {process.env.GTAGID && <GoogleAnalytics gaId={process.env.GTAGID} />}
        {process.env.GTMID && <GoogleTagManager gtmId={process.env.GTMID} />}
        {process.env.BAIDUID && (
          <Script
            strategy={"afterInteractive"}
            src={`https://hm.baidu.com/hm.js?${process.env.BAIDUID}`}
          />
        )}
      </body>
    </html>
  );
}
