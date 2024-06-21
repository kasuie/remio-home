/*
 * @Author: kasuie
 * @Date: 2024-05-26 16:56:52
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-21 22:43:00
 * @Description:
 */
"use client";
import { BgConfig } from "@/config/config";
import { isClientSide, aSakura, clsx } from "@kasuie/utils";

export function MainEffect({
  bg = "https://cs.kasuie.cc/blog/image/wallpaper/bg.webp",
  mbg = "https://kasuie.cc/api/img/bg?type=mobile&size=regular",
  bgStyle,
  blur,
}: BgConfig) {

  const videoExtensions = [
    ".mp4",
    ".webm",
    ".ogg",
    ".mov",
    ".avi",
    ".flv",
    ".mkv",
  ];

  if (isClientSide && bgStyle) {
    aSakura(bgStyle);
  }

  const isVideo = (url: string) => {
    const lowerCaseUrl = url.toLowerCase();
    return videoExtensions.some((extension) =>
      lowerCaseUrl.endsWith(extension)
    );
  };

  const className = clsx(
    "fixed z-0 brightness-50 dark:brightness-[.25] h-full w-full top-0 left-0 bg-cover bg-fixed bg-center bg-no-repeat",
    {
      "blur-none": blur == "none",
      "blur-sm": blur == "sm",
      "blur-md": blur == "md",
      "blur-lg": blur == "lg",
    }
  );

  const renderVideo = (src: string, className: string = "") => {
    return (
      <video
        className={`${className} object-cover`}
        preload="auto"
        src={src}
        loop
        muted
        autoPlay
      ></video>
    );
  };

  return (
    <>
      {bg && isVideo(bg) ? (
        renderVideo(bg, `${className}`)
      ) : (
        <div
          className={className}
          style={{
            backgroundImage: `url(${bg})`,
          }}
        ></div>
      )}
      {mbg && isVideo(mbg) ? (
        renderVideo(mbg, `${className} md:hidden`)
      ) : (
        <div
          className={`${className} md:hidden`}
          style={{
            backgroundImage: `url(${mbg})`,
          }}
        ></div>
      )}
    </>
  );
}
