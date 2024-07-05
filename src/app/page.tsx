/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-07-05 17:55:01
 * @Description:
 */
import { Loader } from "@/components/ui/loader/Loader";
import { Suspense } from "react";
import { getConfig, transformConfig } from "@/lib/config";
import { MainEffect } from "@/components/effect/MainEffect";
import { getMotion } from "@/lib/motion";
import { Footer } from "@/components/layout/Footer";
import { ThemeSwitcher } from "@/components/ui/switcher/ThemeSwitcher";
import dynamic from "next/dynamic";

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
      <ThemeSwitcher
        motions={getMotion(0.1, 5, 0.2, istTransition)}
        theme={globalStyle?.theme}
        className="fixed right-2 top-2 md:right-4 md:top-4"
      />
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
