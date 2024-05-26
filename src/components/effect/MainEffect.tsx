/*
 * @Author: kasuie
 * @Date: 2024-05-26 16:56:52
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-26 16:56:56
 * @Description: 
 */
'use client';
import { isClientSide, aSakura } from '@kasuie/utils';

export function MainEffect({ bg, mbg, bgStyle }: { bg: string, mbg: string, bgStyle: string }) {

  if (isClientSide && bgStyle) {
    aSakura(bgStyle);
  }

  return (
    <>  
      <div 
        className="absolute z-[-1] brightness-50 blur-sm h-full w-full top-0 left-0 bg-cover bg-fixed bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bg})`
        }}
      >
      </div>
      <div 
        className="absolute md:hidden z-[-1] brightness-50 blur-sm h-full w-full top-0 left-0 bg-cover bg-fixed bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${mbg})`
        }}
      >
      </div>
    </>
  );
}