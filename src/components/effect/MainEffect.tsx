/*
 * @Author: kasuie
 * @Date: 2024-05-26 16:56:52
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-18 14:35:17
 * @Description:
 */
"use client";
import { BgConfig } from "@/config/config";
import { isClientSide, aSakura, clsx } from "@kasuie/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { variants, showMotion } from "@/lib/motion";
import { Controller } from "../controller/Controller";

export function MainEffect({
  bgArr,
  mbgArr,
  bgStyle,
  blur,
  carousel = true,
  carouselGap = 6,
  transitionTime,
  transitionStyle = "default",
  autoAnimate,
  theme,
  motions = {},
}: BgConfig & {
  bgArr: string[];
  mbgArr: string[];
  theme?: string;
  motions?: object;
}) {
  const videoExtensions = [
    ".mp4",
    ".webm",
    ".ogg",
    ".mov",
    ".avi",
    ".flv",
    ".mkv",
  ];

  const [index, setIndex] = useState<number>(0);

  const [mindex, setMindex] = useState<number>(0);

  const [variant, setVariant] = useState<Object>({});

  const videoRef = useRef<HTMLVideoElement>(null);

  const [hasVideo, setHasVideo] = useState(false);

  const [vPlaying, setVPlaying] = useState(false);

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

  useEffect(() => {
    if (mbgArr?.length) {
      const index = mbgArr.findIndex((v: string) => isVideo(v));
      if (index > -1) {
        setHasVideo(true);
      }
    }
    if (bgArr?.length) {
      const index = bgArr.findIndex((v: string) => isVideo(v));
      if (index > -1) {
        setHasVideo(true);
      }
    }
  }, [mbgArr, bgArr]);

  const isVideo = (url: string) => {
    const lowerCaseUrl = url?.toLowerCase();
    return videoExtensions.some((extension) =>
      lowerCaseUrl.endsWith(extension)
    );
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleMuteUnmute = (muted: boolean) => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
      videoRef.current.muted = muted;
    }
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
      <>
        <motion.video
          key={`v:${key}:${src}`}
          ref={videoRef}
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
      </>
    );
  };

  const renderIframe = (
    src: string,
    className: string = "",
    key: number | string
  ) => {
    return (
      <iframe
        key={key}
        src={`${src}&danmaku=0&autoplay=1&mute=0`}
        className={clsx(`${className} object-cover`)}
        scrolling="no"
        frameBorder="no"
        allowFullScreen
        allow="autoplay; encrypted-media; gyroscope; web-share"
      />
    );
  };

  const renderBg = (url: string, isMbg: boolean, key: number) => {
    const classNames = clsx(className, {
      "md:hidden": isMbg,
      "[@media(max-width:768px)]:hidden": !isMbg,
    });

    if (!url) return null;

    if (isVideo(url)) return renderVideo(url, classNames, url);

    return (
      <motion.div
        key={`${key}:${url}`}
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
    <section className="z-0">
      <AnimatePresence>
        {bgArr && renderBg(bgArr[index], false, index)}
        {mbgArr && renderBg(mbgArr[mindex], true, mindex)}
        {/* {bgArr && bgArr.map((v, i) => renderBg(v, false, i))}
        {mbgArr && mbgArr.map((v, i) => renderBg(v, true, i))} */}
      </AnimatePresence>
      <Controller
        theme={theme}
        hasVideo={hasVideo}
        motions={motions}
        handleMuteUnmute={handleMuteUnmute}
      />
    </section>
  );
}
