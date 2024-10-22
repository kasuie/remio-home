/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-10-22 21:15:06
 * @Description:
 */
import { Loader } from "@/components/ui/loader/Loader";
import { Suspense } from "react";
import { getConfig, transformConfig } from "@/lib/config";
import { MainEffect } from "@/components/effect/MainEffect";
import { getMotion } from "@/lib/motion";
import { Footer } from "@/components/layout/Footer";
import dynamic from "next/dynamic";
import { Controller } from "@/components/controller/Controller";
import { Weather } from "@/components/weather/Weather";

export const revalidate = 0;

const Horizontal = dynamic(
  async () => (await import("@/components/content/Horizontal")).Horizontal
);

const Vertical = dynamic(
  async () => (await import("@/components/content/Vertical")).Vertical
);

export default async function Home() {
  const {
    staticSites,
    modalSites,
    varStyle,
    istTransition,
    gapSize,
    style,
    bgConfig,
    footer,
    globalStyle,
    resources,
    ...others
  } = transformConfig(await getConfig("config.json"));

  const { bodyHtml } = resources || {};

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
      {globalStyle?.weather && <Weather size={18} />}
      {renderMain({
        ...others,
        gapSize,
        istTransition,
        staticSites,
        modalSites,
        style: varStyle,
      })}
      <MainEffect
        bgArr={bgConfig.bgs}
        mbgArr={bgConfig.mbgs}
        bgStyle={bgConfig?.bgStyle}
        blur={bgConfig?.blur || "sm"}
        audio={bgConfig?.audio}
        theme={globalStyle?.theme}
        motions={getMotion(0.1, 4, 0.2, istTransition)}
      />
      {footer ? (
        <Footer
          motions={getMotion(0.1, 4, 0.2, istTransition)}
          footer={footer}
        />
      ) : null}
      {bodyHtml && (
        <section
          id="remio-bodyHtml"
          className="relative z-20"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        ></section>
      )}
    </Suspense>
  );
}
