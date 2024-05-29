/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-29 16:45:42
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

export const revalidate = 0;

export default async function Home() {

  const appConfig = await getConfig('config.json');
  
  const index = appConfig?.sites?.findIndex?.((v: Site) => !v.url);
  const links = appConfig?.links;
  const subTitle = appConfig?.subTitle;
  const bgStyle = appConfig?.bgStyle;
  const bg = appConfig?.bg || "https://cdn.jsdelivr.net/gh/pixlips/picx-images-hosting@master/web/aierm-hahee.fmu4lbhz3w0.webp";
  const mbg = appConfig?.mbg || "https://cdn.jsdelivr.net/gh/pixlips/picx-images-hosting@master/next/bg_main_new.e8a46387_cr.3w1kjh9qu3w0.webp";

  let staticSites: Array<Site> = [],
    modalSites: Array<Site> = [];

  if (index > -1) {
    staticSites = appConfig.sites.slice(0, index + 1);
    modalSites = appConfig.sites.slice(index + 1, appConfig.sites.length);
  }

  return (
    <Suspense
      fallback={
        <Loader warpClass="h-screen bg-black" miao>
          ᓚᘏᗢ猫猫正在努力加载...
        </Loader>
      }
    >
      <div className="flex w-full flex-col items-center justify-center gap-8 pb-10 pt-[25vh]">
        <Avatar
          fill
          priority
          alt="image"
          src={appConfig.avatar}
          warpClass="hover:top-[-10px] w-32 h-32 relative rounded-full inline-block overflow-hidden cursor-pointer duration-500 top-0 ease-in-out animate-[light_4s_ease-in-out_infinite]"
        />
        <TextEffect { ...appConfig.subTitleConfig } text={subTitle}></TextEffect>
        <SocialIcons {...appConfig.socialConfig} links={links} />
        <Links sitesConfig={appConfig.sitesConfig} primaryColor={appConfig.primaryColor} staticSites={staticSites} modalSites={modalSites} />
      </div>
      <MainEffect bg={bg} mbg={mbg} bgStyle={bgStyle} />
      {appConfig?.footer ? (
        <footer className="absolute bottom-2 left-1/2 translate-x-[-50%] cursor-pointer select-none whitespace-nowrap text-sm">
          {appConfig.footer}
        </footer>
      ) : null}
    </Suspense>
  );
}
