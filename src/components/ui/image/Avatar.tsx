/*
 * @Author: kasuie
 * @Date: 2024-05-22 14:21:22
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-22 14:26:54
 * @Description:
 */
'use client';
import { ImageProps, Image } from './Image';

export type AvatarProps = {
  round?: 'full' | '50%';
  warpClass?: string;
} & ImageProps;

export function Avatar({ warpClass, src, alt, ...imageProps }: AvatarProps) {
  return (
    <div className={warpClass}>
      <Image
        fill
        priority
        alt={alt || 'image'}
        sizes="100%"
        quality={80}
        unoptimized
        src={src}
        {...imageProps}
      />
    </div>
  );
}
