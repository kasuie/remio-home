/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-24 09:46:42
 * @Description:
 */
'use client';
import { SocialIcons } from '@/components/social-icons/SocialIcons';
import { TextEffect } from '@/components/text-effect/TextEffect';
import { Avatar } from '@/components/ui/image/Avatar';
import { Loader } from '@/components/ui/loader/Loader';
import { Links, Site } from '@/components/links/Links';
import { siteConfig } from '@/config/app.config';
import { Suspense } from 'react';

export default function Home() {
  const index = siteConfig?.sites?.findIndex?.((v: Site) => !v.url);
  const links = siteConfig?.links;

  let staticSites: Array<Site> = [],
    modalSites: Array<Site> = [];

  if (index > -1) {
    staticSites = siteConfig.sites.slice(0, index + 1);
    modalSites = siteConfig.sites.slice(index + 1, siteConfig.sites.length);
  }

  return (
    <Suspense
      fallback={
        <Loader warpClass="h-full" miao>
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
        <TextEffect text={siteConfig.subTilte}></TextEffect>
        <SocialIcons links={links} />
        <Links staticSites={staticSites} modalSites={modalSites} />
      </div>
    </Suspense>
  );
}
