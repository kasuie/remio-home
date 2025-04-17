/*
 * @Author: kasuie
 * @Date: 2024-06-26 23:01:20
 * @LastEditors: kasuie
 * @LastEditTime: 2024-11-28 22:02:47
 * @Description:
 */
"use client";
import { AppConfig } from "@/config/config";
import { ConfigProvider } from "@/providers";
import { useContext } from "react";
export default function StyleRegistry() {
  const { appConfig } =
    (useContext(ConfigProvider) as { appConfig: AppConfig }) || {};

  const defaultFont = `
    @font-face {
      font-family: HYTMR;
      src: url("https://npm.elemecdn.com/fontcdn-ariasaka@1.0.0/HYTangMeiRen55W.woff2")
        format("woff2");
      font-weight: normal;
      font-style: normal;
    }
  `;
  let { fonts, fallback } = appConfig.globalStyle || {};

  if (fonts || fallback) {
    const arr: any = [];
    let font = fonts?.reduce((prev, curr) => {
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
    }, defaultFont);

    return (
      <style jsx global>{`
        ${font}
        .mio-fonts {
          font-family: ${arr.length
            ? arr.join(",") + "," + fallback
            : fallback
            ? `HYTMR, ${fallback}`
            : fallback};
        }
      `}</style>
    );
  } else {
    return (
      <style jsx global>{`
        ${defaultFont}
        .mio-fonts {
          font-family: "HYTMR";
        }
      `}</style>
    );
  }
}
