/*
 * @Author: kasuie
 * @Date: 2024-06-12 19:46:02
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-15 18:29:15
 * @Description:
 */
import { MainEffect } from "@/components/effect/MainEffect";
import { Settings } from "@/components/settings/Settings";
import { Loader } from "@/components/ui/loader/Loader";
import { Verify } from "@/components/verify/Verify";
import { getConfig } from "@/lib/config";
import { toHsl } from "@kasuie/utils";
import { Suspense } from "react";

export default async function Config({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const verify = Object.hasOwn(searchParams, "verify");

  const appConfig = await getConfig("config.json");

  const primaryColor = appConfig?.primaryColor || "#229fff";

  const style: any = {
    "--mio-foreground": "210 5.56% 92.94%",
    "--primary-color": primaryColor,
    "--mio-primary": toHsl(primaryColor),
  };

  return (
    <Suspense
      fallback={
        <Loader warpClass="h-screen bg-black" miao>
          ᓚᘏᗢ猫猫正在努力加载...
        </Loader>
      }
    >
      <div
        style={style}
        className="relative z-[1] flex h-screen w-full items-center justify-center"
      >
        {!verify ? <Settings config={appConfig} /> : <Verify />}
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
