/*
 * @Author: kasuie
 * @Date: 2024-05-22 14:29:52
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-23 10:46:50
 * @Description:
 */
'use client';
import { useEffect, useState } from 'react';

export function TextEffect({ text, heart }: { text: string; heart?: boolean }) {
  const [heartCount, setHeartCount] = useState(0);

  useEffect(() => {
    const _document: any = document;
    const width =
      _document && _document.querySelector('.k-words-hearts')?.clientWidth;
    const newHeartCount = Math.floor((width / 50) * 3);
    setHeartCount(newHeartCount);
  }, []);

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

  return (
    <div
      className={`k-words-hearts relative text-center font-[cursive] text-[20px] text-white`}
    >
      {`${text}`}
      {heart && renderParticles()}
      <span
        className={`absolute rotate-[75deg] bg-[#cc2a5d] opacity-100 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:translate-x-[-50%] before:rounded-[100px] before:bg-[#cc2a5d] before:content-[''] after:absolute after:left-0 after:top-0 after:h-full after:w-full after:translate-y-[-50%] after:rounded-[100px] after:bg-[#cc2a5d] after:content-['']`}
        style={{
          top: `30%`,
          right: '-3px',
          width: `6px`,
          height: `6px`,
          animationDelay: `0.2s`,
        }}
      ></span>
    </div>
  );
}
