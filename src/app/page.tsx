/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-30 22:02:01
 * @Description:
 */
import { SocialIcons } from '@/components/social-icons/SocialIcons';
import { TextEffect } from '@/components/effect/TextEffect';
import { Avatar } from '@/components/ui/image/Avatar';
import { Loader } from '@/components/ui/loader/Loader';
import { Links } from '@/components/links/Links';
import { Suspense } from 'react';
import { getConfig } from '@/lib/config';
import { MainEffect } from '@/components/effect/MainEffect';
import { Site } from '@/config/config';
import { clsx } from '@kasuie/utils';
import { getMotion } from '@/lib/motion';
import { Footer } from '@/components/layout/Footer';

export const revalidate = 0;

export default async function Home() {

  const appConfig = await getConfig('config.json');
  
  const index = appConfig?.sites?.findIndex?.((v: Site) => !v.url);
  const links = appConfig?.links;
  const subTitle = appConfig?.subTitle;
  const bgConfig = appConfig?.bgConfig;
  const { istTransition = true, gapSize = "md" } = appConfig?.layoutConfig || {};

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
      <div className={clsx("flex w-full flex-col items-center justify-center pb-10", {
        "gap-[30px] pt-[20vh]": gapSize == "md",
        "gap-8 pt-[25vh]": gapSize == "sm",
        "gap-12 pt-[15vh]": gapSize == "lg"
      })}>
        <Avatar
          fill
          priority
          isShowMotion
          alt={appConfig.name}
          src={appConfig.avatar}
          motions={getMotion(0.1, 0, 0.2, istTransition)}
          warpClass="hover:top-[-10px] w-32 h-32 relative transition-[top] rounded-full inline-block overflow-hidden cursor-pointer duration-500 top-0 ease-in-out animate-[light_4s_ease-in-out_infinite]"
        />
        <TextEffect { ...appConfig.subTitleConfig } motions={getMotion(0.1, 1, 0.2, istTransition)} text={subTitle}></TextEffect>
        <SocialIcons {...appConfig.socialConfig} motions={getMotion(0.1, 2, 0.2, istTransition)} links={links} />
        <Links sitesConfig={appConfig.sitesConfig} motions={getMotion(0.1, 3, 0.2, istTransition)} primaryColor={appConfig.primaryColor} staticSites={staticSites} modalSites={modalSites} />
      </div>
      <MainEffect
        bg={bgConfig?.bg || "https://cs.kasuie.cc/blog/image/wallpaper/bg.webp"}
        mbg={bgConfig?.mbg || "https://kasuie.cc/api/img/bg?type=mobile&size=regular"}
        bgStyle={bgConfig?.bgStyle}
        blur={bgConfig?.blur || "sm"}
      />
      {appConfig?.footer ? (
        <Footer motions={getMotion(0.1, 4, 0.2, istTransition)} text={appConfig.footer} />
      ) : null}
    </Suspense>
  );
}
