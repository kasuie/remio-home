/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-21 18:03:46
 * @Description:
 */
'use client';
import { Loader } from '@/components/ui/loader/Loader';
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
      <div className=" w-screen pb-10">
        555
      </div>
    </Suspense>
  );
}
