/*
 * @Author: kasuie
 * @Date: 2024-05-22 14:29:52
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-30 21:21:33
 * @Description:
 */
'use client';
import { SubTitleConfig } from '@/config/config';
import { clsx } from '@kasuie/utils';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function TextEffect({ text, heart = true, showFrom = true, shadow = false, typing = false, typingGap = 10, loopTyping = false, typingCursor = true, motions = {} }: SubTitleConfig & { text?: string, motions?: object }) {
  const [heartCount, setHeartCount] = useState(0);
  const [subTitle, setSubTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [tempText, setTempText] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const [isHitokoto, setIsHitokoto] = useState(false);
  const [from, setFrom] = useState("");

  useEffect(() => {
    const width: number | undefined =
      document?.querySelector('.k-words-hearts')?.clientWidth;
    if (width) {
      const newHeartCount = Math.floor((width / 50) * 3);
      setHeartCount(newHeartCount);
    }
  }, []);

  useEffect(() => {
    if (text?.includes('hitokoto') && text?.includes('http')) {
      setIsHitokoto(true);
      fetch(text)
        .then((response) => {
          return response.ok ? response?.json() : null;
        })
        .then((res) => {
          setLoadingText(res?.hitokoto);
          showFrom && setFrom(res?.from);
        })
        .catch((e) => console.log('error>>>', e));
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
        fetch(text, { cache: 'no-store' })
        .then((response) => {
          return response.ok ? response?.json() : null;
        })
        .then((res) => {
          setTimeout(() => {
            writing(subTitle.length - 1, loadingText, loadingText, false);
            showFrom && setTimeout(() => setFrom(res?.from), 1000)
          }, Math.max(+typingGap * 1000, 3000));
          setTempText(res?.hitokoto);
        })
        .catch((e) => console.log('error>>>', e));
      } else if (!subTitle && tempText && tempText != loadingText) {
        setTimeout(() => setLoadingText(tempText), 3000);
      }
    }
  }, [subTitle]);

  const writing = (index: number, words: string, text: string, increase: boolean = true) => {
    if (index < words.length && increase) {
      text = text + words[index];
      setSubTitle(text);
      setTimeout(() => writing(++index, words, text), 200);
    } else {
      if (index == 0) {
        setSubTitle("");
      } else if(index != words.length){
        text = text.slice(0, -1);
        setSubTitle(text);
        setTimeout(() => writing(--index, words, text, false), 50);
      }
    }
  }

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
    return loading ? <motion.div className='min-h-[30px]' {...motions}>...</motion.div> : null;
  }

  return (
    <motion.div
      className={clsx(`k-words-hearts relative text-center font-[cursive] text-[20px] text-white`, {
        "min-h-[30px]": typing && !typingCursor,
        "mb-3": showFrom && typing
      })}
      style={{
        textShadow: shadow ? "2px 2px 1px skyblue" : ""
      }}
      {...motions}
    >
      <span>{subTitle}</span>
      {
        typingCursor && typing ? <span className="animate-[mio-pulse_.7s_infinite]">|</span> : null
      }
      {
        heart &&
        <span
          className={clsx(`absolute top-[30%] right-[-10px] w-[6px] h-[6px] rotate-[75deg] bg-[#cc2a5d] opacity-100 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:translate-x-[-50%] before:rounded-[100px] before:bg-[#cc2a5d] before:content-[''] after:absolute after:left-0 after:top-0 after:h-full after:w-full after:translate-y-[-50%] after:rounded-[100px] after:bg-[#cc2a5d] after:content-['']`, {
            "!opacity-0": loadingText && loadingText != subTitle
          })}
        ></span>
      }
      {
        showFrom ? <span className={clsx("absolute scale-75 opacity-0 duration-500 ease-in-out right-0 left-0 flex justify-center bottom-[-20px] md:bottom-[calc(-100%+12px)] text-xs", {
          "!opacity-100 !scale-100": loadingText == subTitle
        })}>《{from}》</span> : null
      }
    </motion.div>
  );
}
