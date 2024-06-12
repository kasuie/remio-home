/*
 * @Author: kasuie
 * @Date: 2024-05-22 14:21:22
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-12 17:33:46
 * @Description:
 */
"use client";
import { AvatarConfig } from "@/config/config";
import { ImageProps, Image } from "./Image";
import { motion } from "framer-motion";
import { clsx } from "@kasuie/utils";

export type AvatarProps = {
  warpClass?: string;
  isShowMotion?: boolean;
  motions?: object;
  animateStyle?: string;
} & AvatarConfig & ImageProps;

export function Avatar({
  warpClass,
  src,
  alt,
  isShowMotion,
  motions,
  round,
  hoverAnimate,
  animateStyle,
  size,
  width,
  height,
  className,
  ...imageProps
}: AvatarProps) {
  return (
    <motion.div className={clsx(
      "relative z-[1] transition-[top,transform] rotate-0 inline-block cursor-pointer duration-500 top-0 ease-in-out",
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
      }
    )} {...(isShowMotion ? motions : {})}>
      {
        animateStyle === "wave" && (
          <>
            <span className="animate-[mio-ping_2s_1s_ease-in_infinite] absolute inline-flex h-full w-full rounded-full bg-white dark:bg-black "></span>
            <span className="animate-[mio-ping_2s_ease-in_infinite] absolute inline-flex h-full w-full rounded-full bg-white dark:bg-black"></span>
            <span className="animate-[mio-ping_2s_ease-in_infinite] absolute inline-flex h-full w-full rounded-full bg-white dark:bg-black"></span>
          </>
        )
      }
      <Image alt={alt || "image"} src={src} width={size || width} height={size || height} className={clsx(`${className || ""} relative z-[1]`, {
        "rounded-full": !round || round == "full",
        "rounded-3xl": round == "3xl",
        "rounded-xl": round == "xl",
        "rounded-sm": round == "sm",
        "rounded-md": round == "md",
        "rounded-lg": round == "lg", 
      })} {...imageProps} />
    </motion.div>
  );
}
