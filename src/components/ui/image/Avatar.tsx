/*
 * @Author: kasuie
 * @Date: 2024-05-22 14:21:22
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-30 11:42:03
 * @Description:
 */
'use client';
import { ImageProps, Image } from './Image';
import { motion } from 'framer-motion';
import { showMotion } from '@/lib/motion';

export type AvatarProps = {
  round?: 'full' | '50%';
  warpClass?: string;
  isShowMotion?: boolean;
} & ImageProps;

export function Avatar({ warpClass, src, alt, isShowMotion, ...imageProps }: AvatarProps) {
  return (
    <motion.div
      className={warpClass}
      {...(isShowMotion ? showMotion : {})}
    >
      <Image alt={alt || 'image'} src={src} {...imageProps} />
    </motion.div>
  );
}
