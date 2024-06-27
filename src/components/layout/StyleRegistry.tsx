/*
 * @Author: kasuie
 * @Date: 2024-06-26 23:01:20
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-28 00:17:03
 * @Description:
 */
"use client";
import { AppConfig } from "@/config/config";
import { ConfigProvider } from "@/providers";
import { useContext } from "react";
export default function StyleRegistry() {
  const { appConfig } =
    (useContext(ConfigProvider) as { appConfig: AppConfig }) || {};

  if (appConfig?.globalStyle) {
    let { fonts, fallback } = appConfig.globalStyle;
    const arr: any = [];
    const font = fonts?.reduce((prev, curr) => {
      arr.push(curr?.name);
      return `
            @font-face {
                font-family: ${curr?.name};
                src: url("${curr?.src}");
                font-weight: normal;
                font-style: normal;
            }
            ${prev}
        `;
    }, "");

    if (!arr?.length && !fallback) {
      return null
    }
    
    return (
      <style jsx global>{`
        ${font}
        .mio-fonts {
          font-family: ${arr.length ? (arr.join(",") + ',' + fallback) : fallback }};
        }
      `}</style>
    );
  } else {
    return null;
  }
}
