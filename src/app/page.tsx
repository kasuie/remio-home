/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-22 20:30:23
 * @Description:
 */
'use client';
import { SocialIcons } from '@/components/social-icons/SocialIcons';
import { TextEffect } from '@/components/text-effect/TextEffect';
import { Avatar } from '@/components/ui/image/Avatar';
import { Loader } from '@/components/ui/loader/Loader';
import { Links } from '@/components/links/Links';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense
      fallback={
        <Loader warpClass="h-full" miao>
          ᓚᘏᗢ猫猫正在努力加载...
        </Loader>
      }
    >
      <div className="flex w-screen pt-[25vh] flex-col items-center justify-center gap-8 pb-10">
        <Avatar
          alt="image"
          src="https://cdn.jsdelivr.net/gh/pixlips/picx-images-hosting@master/web/kasuie_new.5du9br5ow240.webp"
          warpClass="hover:top-[-10px] w-32 h-32 relative rounded-full inline-block overflow-hidden cursor-pointer duration-500 top-0 ease-in-out animate-[light_4s_ease-in-out_infinite]"
        />
        <TextEffect text={`This is kasuie's personal homepage.`}></TextEffect>
        <SocialIcons />
        <Links />
      </div>
    </Suspense>
  );
}
