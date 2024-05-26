/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-26 17:01:11
 * @Description:
 */
import { SocialIcons } from '@/components/social-icons/SocialIcons';
import { TextEffect } from '@/components/effect/TextEffect';
import { Avatar } from '@/components/ui/image/Avatar';
import { Loader } from '@/components/ui/loader/Loader';
import { Links, Site } from '@/components/links/Links';
import { Suspense } from 'react';
import { getConfig } from '@/lib/config';
import { MainEffect } from '@/components/effect/MainEffect';

export const revalidate = 0;

export default async function Home() {

  const siteConfig = await getConfig('config.json');
  
  const index = siteConfig?.sites?.findIndex?.((v: Site) => !v.url);
  const links = siteConfig?.links;
  const subTitle = siteConfig?.subTitle;
  const bgStyle = siteConfig?.bgStyle;
  const bg = siteConfig?.bg || "https://cdn.jsdelivr.net/gh/pixlips/picx-images-hosting@master/web/aierm-hahee.fmu4lbhz3w0.webp";
  const mbg = siteConfig?.mbg || "https://cdn.jsdelivr.net/gh/pixlips/picx-images-hosting@master/next/bg_main_new.e8a46387_cr.3w1kjh9qu3w0.webp";

  let staticSites: Array<Site> = [],
    modalSites: Array<Site> = [];

  if (index > -1) {
    staticSites = siteConfig.sites.slice(0, index + 1);
    modalSites = siteConfig.sites.slice(index + 1, siteConfig.sites.length);
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
          alt="image"
          src={siteConfig.avatar}
          warpClass="hover:top-[-10px] w-32 h-32 relative rounded-full inline-block overflow-hidden cursor-pointer duration-500 top-0 ease-in-out animate-[light_4s_ease-in-out_infinite]"
        />
        <TextEffect text={subTitle}></TextEffect>
        <SocialIcons links={links} />
        <Links staticSites={staticSites} modalSites={modalSites} />
      </div>
      <MainEffect bg={bg} mbg={mbg} bgStyle={bgStyle} />
      {siteConfig?.footer ? (
        <footer className="absolute bottom-2 left-1/2 translate-x-[-50%] cursor-pointer select-none whitespace-nowrap text-sm">
          {siteConfig.footer}
        </footer>
      ) : null}
    </Suspense>
  );
}
