/*
 * @Author: kasuie
 * @Date: 2024-05-26 16:56:52
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-23 00:54:05
 * @Description:
 */
"use client";
import { BgConfig } from "@/config/config";
import { isClientSide, aSakura, clsx } from "@kasuie/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { variants } from "@/lib/motion";

export function MainEffect({
  bg,
  mbg,
  bgStyle,
  blur,
  carousel = true,
  carouselGap = 6,
  transitionTime,
  transitionStyle = "default",
  autoAnimate,
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

  const [bgArr, setBgArr] = useState<string[]>();

  const [mbgArr, setMbgArr] = useState<string[]>();

  const [index, setIndex] = useState<number>(0);

  const [mindex, setMindex] = useState<number>(0);

  const [variant, setVariant] = useState<Object>({});

  useEffect(() => {
    if (bg) {
      typeof bg === "string" ? setBgArr([bg]) : setBgArr(bg);
    } else {
      setBgArr(["https://s2.loli.net/2024/06/21/euQ48saP7UgMyDr.webp"]);
    }
  }, [bg]);

  useEffect(() => {
    if (mbg) {
      typeof mbg === "string" ? setMbgArr([mbg]) : setMbgArr(mbg);
    } else {
      setMbgArr(["https://s2.loli.net/2024/06/21/59b6eRscAvQWHT1.webp"]);
    }
  }, [mbg]);

  useEffect(() => {
    if (isClientSide && bgStyle && document) {
      if (!document.querySelector("#remio_sakura")) {
        aSakura(bgStyle);
      }
    }
  });

  useEffect(() => {
    if (bgArr && bgArr.length > 1 && carousel) {
      const timer = setInterval(
        () => {
          setIndex((prevIndex) => (prevIndex + 1) % bgArr.length);
        },
        Math.max((carouselGap || 5) * 1000, 3000)
      );
      return () => clearInterval(timer);
    }
  }, [bgArr, carousel]);

  useEffect(() => {
    if (mbgArr && mbgArr.length > 1 && carousel) {
      const timer = setInterval(
        () => {
          setMindex((prevMindex) => (prevMindex + 1) % mbgArr.length);
        },
        Math.max((carouselGap || 5) * 1000, 3000)
      );
      return () => clearInterval(timer);
    }
  }, [mbgArr, carousel]);

  useEffect(() => {
    if (!autoAnimate) {
      transitionStyle
        ? setVariant(variants.default)
        : setVariant(variants[transitionStyle]);
    }
  }, [autoAnimate, transitionStyle]);

  const isVideo = (url: string) => {
    const lowerCaseUrl = url?.toLowerCase();
    return videoExtensions.some((extension) =>
      lowerCaseUrl.endsWith(extension)
    );
  };

  const className = clsx(
    "fixed brightness-50 dark:brightness-[.25] h-full w-full top-0 left-0 bg-cover bg-fixed bg-center bg-no-repeat",
    {
      "blur-none": blur == "none",
      "blur-sm": blur == "sm",
      "blur-md": blur == "md",
      "blur-lg": blur == "lg",
    }
  );

  const renderVideo = (
    src: string,
    className: string = "",
    key: number | string
  ) => {
    return (
      <motion.video
        key={key}
        className={clsx(`${className} object-cover`)}
        preload="auto"
        src={src}
        loop
        muted
        autoPlay
        {...variant}
        transition={{
          duration: transitionTime || 0.7,
          ease: "easeInOut",
        }}
      ></motion.video>
    );
  };

  const renderBg = (url: string, isMbg: boolean, key: number) => {
    const classNames = clsx(className, {
      "md:hidden": isMbg,
      "[@media(max-width:768px)]:hidden": !isMbg,
    });

    return url && isVideo(url) ? (
      renderVideo(url, classNames, url)
    ) : (
      <motion.div
        key={url}
        className={clsx(classNames, {
          "animate-[mio-bg-top_6s_linear_reverse_infinite]":
            key % 4 == 0 && autoAnimate,
          "animate-[mio-bg-bottom_6s_linear_reverse_infinite]":
            key % 4 == 1 && autoAnimate,
          "animate-[mio-bg-right_6s_linear_reverse_infinite]":
            key % 4 == 2 && autoAnimate,
          "animate-[mio-bg-left_6s_linear_reverse_infinite]":
            key % 4 == 3 && autoAnimate,
        })}
        style={{
          backgroundImage: `url(${url})`,
        }}
        {...variant}
        transition={{
          duration: transitionTime || 0.7,
          ease: "easeInOut",
        }}
      ></motion.div>
    );
  };

  return (
    <section className="relative z-0">
      <AnimatePresence>
        {bgArr && renderBg(bgArr[index], false, index)}
        {mbgArr && renderBg(mbgArr[mindex], true, mindex)}
        {/* {bgArr && bgArr.map((v, i) => renderBg(v, false, i))}
        {mbgArr && mbgArr.map((v, i) => renderBg(v, true, i))} */}
      </AnimatePresence>
    </section>
  );
}
