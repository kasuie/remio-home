/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-19 16:38:20
 * @Description:
 */
import { Loader } from "@/components/ui/loader/Loader";
import { Suspense } from "react";
import { getConfig } from "@/lib/config";
import { MainEffect } from "@/components/effect/MainEffect";
import { Site } from "@/config/config";
import { getMotion } from "@/lib/motion";
import { Footer } from "@/components/layout/Footer";
import { ThemeSwitcher } from "@/components/ui/switcher/ThemeSwitcher";
import dynamic from "next/dynamic";

export const revalidate = 0;

const Horizontal = dynamic(
  async () => (await import("@/components/content/Horizontal")).Horizontal
);

const Vertical = dynamic(
  async () => (await import("@/components/content/Vertical")).Vertical
);

export default async function Home() {
  const appConfig = await getConfig("config.json");

  const index = appConfig?.sites?.findIndex?.((v: Site) => !v.url);
  const links = appConfig?.links;
  const subTitle = appConfig?.subTitle;
  const bgConfig = appConfig?.bgConfig;
  const {
    istTransition = true,
    gapSize = "sm",
    style,
  } = appConfig?.layoutConfig || {};

  const primaryColor = appConfig?.primaryColor || "#229fff";

  const varStyle: any = {
    "--primary-color": primaryColor
  };

  let staticSites: Array<Site> = [],
    modalSites: Array<Site> = [];

  if (index > -1) {
    if (!appConfig?.sitesConfig?.modal) {
      appConfig.sites.splice(index, 1) && (staticSites = appConfig.sites);
    } else {
      staticSites = appConfig.sites.slice(0, index + 1);
      modalSites = appConfig.sites.slice(index + 1, appConfig.sites.length);
    }
  } else {
    staticSites = appConfig.sites;
  }

  const renderMain = (props: any) => {
    if (style === "horizontal") {
      return <Horizontal {...props} />;
    } else {
      return <Vertical {...props} />;
    }
  };

  return (
    <Suspense
      fallback={
        <Loader warpClass="h-screen bg-black" miao>
          ᓚᘏᗢ猫猫正在努力加载...
        </Loader>
      }
    >
      <ThemeSwitcher
        motions={getMotion(0.1, 5, 0.2, istTransition)}
        theme={appConfig?.theme}
        className="fixed right-4 top-4"
      />
      {renderMain({
        gapSize,
        istTransition,
        subTitle,
        links,
        staticSites,
        modalSites,
        style: varStyle,
        socialConfig: appConfig.socialConfig,
        cardOpacity: bgConfig.cardOpacity,
        sliders: appConfig.sliders,
        subTitleConfig: appConfig?.subTitleConfig,
        sitesConfig: appConfig?.sitesConfig,
        name: appConfig.name,
        avatarConfig: appConfig.avatarConfig,
        primaryColor: appConfig.primaryColor,
      })}
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
          footer={appConfig.footer}
        />
      ) : null}
    </Suspense>
  );
}
