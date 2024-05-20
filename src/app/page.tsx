/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-20 19:51:47
 * @Description:
 */

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
      <div className=" w-screen pb-10">55</div>
    </Suspense>
  );
}
