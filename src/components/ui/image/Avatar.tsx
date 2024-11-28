/*
 * @Author: kasuie
 * @Date: 2024-05-22 14:21:22
 * @LastEditors: kasuie
 * @LastEditTime: 2024-11-28 20:58:12
 * @Description:
 */
"use client";
import { AvatarConfig } from "@/config/config";
import { ImageProps, Image } from "./Image";
import { motion } from "framer-motion";
import { clsx, transitions } from "@kasuie/utils";

export type AvatarProps = {
  warpClass?: string;
  isShowMotion?: boolean;
  motions?: object;
  animateStyle?: string;
  layoutStyle?: string;
} & AvatarConfig &
  ImageProps;

export function Avatar({
  warpClass = "",
  src,
  alt,
  isShowMotion,
  motions,
  round,
  hoverAnimate,
  animateStyle,
  layoutStyle,
  aloneRight,
  size,
  width,
  height,
  className,
  ...imageProps
}: AvatarProps) {
  return (
    <motion.div
      className={clsx(
        "relative top-0 z-[1] inline-block rotate-0 cursor-pointer transition-[top,transform] duration-500 ease-in-out md:max-w-none",
        {
          "hover:top-[-10px]": hoverAnimate == "top",
          "hover:!rotate-[360deg] ": hoverAnimate == "rotate",
          "animate-[light_4s_ease-in-out_infinite]": animateStyle == "glint",
          "rounded-full": !round || round == "full",
          "rounded-3xl": round == "3xl",
          "rounded-xl": round == "xl",
          "rounded-sm": round == "sm",
          "rounded-md": round == "md",
          "rounded-lg": round == "lg",
          "max-w-32": layoutStyle === "horizontal",
          [`${warpClass}`]: warpClass,
        }
      )}
      {...(isShowMotion ? motions : {})}
    >
      {animateStyle === "wave" && (
        <>
          <span className="absolute inline-flex h-full w-full animate-[mio-ping_2s_0.3s_ease-in-out_infinite] rounded-full bg-white duration-300 dark:bg-black "></span>
          <span className="absolute inline-flex h-full w-full animate-[mio-ping_2s_0.7s_ease-in-out_infinite] rounded-full bg-white duration-300 dark:bg-black"></span>
          <span className="absolute inline-flex h-full w-full animate-[mio-ping_2s_1s_ease-in_infinite] rounded-full bg-white dark:bg-black"></span>
        </>
      )}
      <Image
        alt={alt || "image"}
        src={src}
        width={size || width}
        height={size || height}
        className={clsx(`${className || ""} relative z-[1]`, {
          "rounded-full": !round || round == "full",
          "rounded-3xl": round == "3xl",
          "rounded-xl": round == "xl",
          "rounded-sm": round == "sm",
          "rounded-md": round == "md",
          "rounded-lg": round == "lg",
        })}
        {...imageProps}
      />
    </motion.div>
  );
}
