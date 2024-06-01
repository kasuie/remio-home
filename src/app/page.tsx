/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-01 17:16:12
 * @Description:
 */
import { Loader } from "@/components/ui/loader/Loader";
import { Suspense } from "react";
import { getConfig } from "@/lib/config";
import { MainEffect } from "@/components/effect/MainEffect";
import { Site } from "@/config/config";
import { getMotion } from "@/lib/motion";
import { Footer } from "@/components/layout/Footer";
import { Vertical } from "@/components/content/Vertical";

export const revalidate = 0;

export default async function Home() {
  const appConfig = await getConfig("config.json");

  const index = appConfig?.sites?.findIndex?.((v: Site) => !v.url);
  const links = appConfig?.links;
  const subTitle = appConfig?.subTitle;
  const bgConfig = appConfig?.bgConfig;
  const { istTransition = true, gapSize = "md" } =
    appConfig?.layoutConfig || {};

  let staticSites: Array<Site> = [],
    modalSites: Array<Site> = [];

  if (index > -1) {
    if (!appConfig?.sitesConfig?.modal) {
      appConfig.sites.splice(index, 1) && (staticSites = appConfig.sites);
    } else {
      staticSites = appConfig.sites.slice(0, index + 1);
      modalSites = appConfig.sites.slice(index + 1, appConfig.sites.length);
    }
  }

  return (
    <Suspense
      fallback={
        <Loader warpClass="h-screen bg-black" miao>
          ᓚᘏᗢ猫猫正在努力加载...
        </Loader>
      }
    >
      <Vertical
        {...{
          gapSize,
          istTransition,
          subTitle,
          links,
          staticSites,
          modalSites,
          subTitleConfig: appConfig?.subTitleConfig,
          sitesConfig: appConfig?.sitesConfig,
          name: appConfig.name,
          avatarConfig: appConfig.avatarConfig,
          primaryColor: appConfig.primaryColor,
        }}
      />
      <MainEffect
        bg={bgConfig?.bg || "https://cs.kasuie.cc/blog/image/wallpaper/bg.webp"}
        mbg={
          bgConfig?.mbg ||
          "https://kasuie.cc/api/img/bg?type=mobile&size=regular"
        }
        bgStyle={bgConfig?.bgStyle}
        blur={bgConfig?.blur || "sm"}
      />
      {appConfig?.footer ? (
        <Footer
          motions={getMotion(0.1, 4, 0.2, istTransition)}
          text={appConfig.footer}
        />
      ) : null}
    </Suspense>
  );
}
