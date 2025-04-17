/*
 * @Author: kasuie
 * @Date: 2024-05-22 14:29:52
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-27 18:00:29
 * @Description:
 */
"use client";
import { SubTitleConfig } from "@/config/config";
import { clsx } from "@kasuie/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TextUpView } from "../ui/transition/TextUpView";

export function TextEffect({
  text,
  heart = true,
  showFrom = true,
  shadow = false,
  typing = false,
  loading = false,
  typingGap = 10,
  loopTyping = false,
  typingCursor = true,
  gapDelay = 0.05,
  motions = {},
}: SubTitleConfig & { text?: string; motions?: object }) {
  const [heartCount, setHeartCount] = useState(0);
  const [subTitle, setSubTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tempText, setTempText] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const [isHitokoto, setIsHitokoto] = useState(false);
  const [from, setFrom] = useState("");

  useEffect(() => {
    const width: number | undefined =
      document?.querySelector(".k-words-hearts")?.clientWidth;
    if (width) {
      const newHeartCount = Math.floor((width / 50) * 3);
      setHeartCount(newHeartCount);
    }
  }, []);

  useEffect(() => {
    if (text?.includes("hitokoto") && text?.includes("http")) {
      setIsHitokoto(true);
      fetch(text)
        .then((response) => {
          return response.ok ? response?.json() : null;
        })
        .then((res) => {
          setLoadingText(res?.hitokoto);
          showFrom && setFrom(`《${res?.from}》`);
        })
        .catch((e) => console.log("error>>>", e));
    } else if (text) {
      setSubTitle(text);
    }
  }, [text]);

  useEffect(() => {
    if (loadingText) {
      typing ? writing(0, loadingText, "") : setSubTitle(loadingText);
    }
  }, [loadingText]);

  useEffect(() => {
    if (isHitokoto && text && typing && loopTyping) {
      if (subTitle && subTitle === loadingText) {
        fetch(text, { cache: "no-store" })
          .then((response) => {
            return response.ok ? response?.json() : null;
          })
          .then((res) => {
            setTimeout(
              () => {
                writing(subTitle.length - 1, loadingText, loadingText, false);
                showFrom && setTimeout(() => setFrom(`《${res?.from}》`), 1000);
              },
              Math.max(+typingGap * 1000, 3000)
            );
            setTempText(res?.hitokoto);
          })
          .catch((e) => console.log("error>>>", e));
      } else if (!subTitle && tempText && tempText != loadingText) {
        setTimeout(() => setLoadingText(tempText), 3000);
      }
    }
  }, [subTitle]);

  const writing = (
    index: number,
    words: string,
    text: string,
    increase: boolean = true
  ) => {
    if (index < words.length && increase) {
      text = text + words[index];
      setSubTitle(text);
      setTimeout(() => writing(++index, words, text), 200);
    } else {
      if (index == 0) {
        setSubTitle("");
      } else if (index != words.length) {
        text = text.slice(0, -1);
        setSubTitle(text);
        setTimeout(() => writing(--index, words, text, false), 50);
      }
    }
  };

  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i <= heartCount; i++) {
      const size = Math.floor(Math.random() * (120 - 60 + 1) + 30) / 10;
      particles.push(
        <span
          key={i}
          className={`absolute rotate-[75deg] bg-[#cc2a5d] opacity-100 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:translate-x-[-50%] before:rounded-[100px] before:bg-[#cc2a5d] before:content-[''] after:absolute after:left-0 after:top-0 after:h-full after:w-full after:translate-y-[-50%] after:rounded-[100px] after:bg-[#cc2a5d] after:content-['']`}
          style={{
            top: `${Math.floor(Math.random() * (80 - 20 + 1) + 20)}%`,
            left: `${Math.floor(Math.random() * 95)}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${Math.floor(Math.random() * 3) / 10}s`,
          }}
        ></span>
      );
    }
    return particles;
  };

  if (!subTitle && !loadingText && !tempText) {
    return isLoading ? (
      <motion.div className="min-h-[30px] z-[1]" {...motions}>
        ...
      </motion.div>
    ) : null;
  }

  return (
    <motion.div
      className={clsx(
        `k-words-hearts z-[1] relative mx-4 min-h-[30px] text-center text-[20px] text-white sm:mx-0`,
        {
          "mb-3": showFrom && typing,
        }
      )}
      style={{
        textShadow: shadow ? "2px 2px 1px skyblue" : "",
      }}
      {...motions}
    >
      <TextUpView
        className="inline-block"
        appear={loading == "wave" && !typing}
        eachDelay={gapDelay}
      >
        {subTitle}
      </TextUpView>
      {typingCursor && typing ? (
        <span className="animate-[mio-pulse_.7s_infinite]">|</span>
      ) : null}
      {heart && (
        <motion.span
          className={clsx(
            `absolute right-[-10px] top-[30%] h-[6px] w-[6px] rotate-[75deg] bg-[#cc2a5d] opacity-100 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:translate-x-[-50%] before:rounded-[100px] before:bg-[#cc2a5d] before:content-[''] after:absolute after:left-0 after:top-0 after:h-full after:w-full after:translate-y-[-50%] after:rounded-[100px] after:bg-[#cc2a5d] after:content-['']`,
            {
              "!opacity-0": loadingText && loadingText != subTitle,
            }
          )}
          initial={{ opacity: 0.001 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.1,
              delay: loading === "wave" ? loadingText?.length * gapDelay : 0,
            },
          }}
        ></motion.span>
      )}
      {showFrom ? (
        <TextUpView
          appear={loading == "wave"}
          eachDelay={gapDelay}
          initialDelay={loadingText?.length * gapDelay}
          className={clsx(
            "absolute bottom-[-20px] left-0 right-0 flex scale-75 justify-center text-xs opacity-0 duration-500 ease-in-out md:bottom-[calc(-100%+12px)]",
            {
              "!scale-100 !opacity-100": loadingText == subTitle,
            }
          )}
        >
          {from}
        </TextUpView>
      ) : null}
    </motion.div>
  );
}
