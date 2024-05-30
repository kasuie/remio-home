/*
 * @Author: kasuie
 * @Date: 2024-05-26 16:56:52
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-30 18:09:58
 * @Description: 
 */
'use client';
import { BgConfig } from '@/config/config';
import { isClientSide, aSakura, clsx } from '@kasuie/utils';

export function MainEffect({ bg, mbg, bgStyle, blur }: BgConfig) {

  if (isClientSide && bgStyle) {
    aSakura(bgStyle);
  }

  const className = clsx("absolute z-[-1] brightness-50 blur-sm h-full w-full top-0 left-0 bg-cover bg-fixed bg-center bg-no-repeat", {
    "blur-none": blur == "none",
    "blur-sm": blur == "sm",
    "blur-md": blur == "md",
    "blur-lg": blur == "lg"
  })

  return (
    <>  
      <div 
        className={className}
        style={{
          backgroundImage: `url(${bg})`
        }}
      >
      </div>
      <div 
        className={`${className} md:hidden`}
        style={{
          backgroundImage: `url(${mbg})`
        }}
      >
      </div>
    </>
  );
}