/*
 * @Author: kasuie
 * @Date: 2024-06-12 19:46:02
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-12 20:00:37
 * @Description:
 */
import { MainEffect } from "@/components/effect/MainEffect";
import { Settings } from "@/components/settings/Settings";
import { Loader } from "@/components/ui/loader/Loader";
import { getConfig } from "@/lib/config";
import { Suspense } from "react";

export default async function Config() {
  const appConfig = await getConfig("config.json");

  return (
    <Suspense
      fallback={
        <Loader warpClass="h-screen bg-black" miao>
          ᓚᘏᗢ猫猫正在努力加载...
        </Loader>
      }
    >
      <div className="flex h-screen w-full items-center justify-center">
        <Settings config={appConfig} />
      </div>
      <MainEffect
        bg={
          appConfig.bgConfig?.bg ||
          "https://cs.kasuie.cc/blog/image/wallpaper/bg.webp"
        }
        mbg={
          appConfig.bgConfig?.mbg ||
          "https://kasuie.cc/api/img/bg?type=mobile&size=regular"
        }
        bgStyle={appConfig.bgConfig?.bgStyle}
        blur={appConfig.bgConfig?.blur || "sm"}
      />
    </Suspense>
  );
}
