/*
 * @Author: kasuie
 * @Date: 2024-05-22 14:21:22
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-25 14:42:57
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
    <div
      className={warpClass}
    >
      <Image alt={alt || 'image'} src={src} {...imageProps} />
    </div>
  );
}
