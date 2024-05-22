/*
 * @Author: kasuie
 * @Date: 2024-05-22 14:11:51
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-22 14:16:36
 * @Description:
 */
'use client';
import { makeBlurDataURL } from '@/lib/image';
import NextImage, { ImageProps as OImageProps } from 'next/image';

export type ImageProps = {
  alt?: string | undefined;
  className?: any;
  imageProps?: any;
  skeleton?: boolean;
} & OImageProps;

export const Image = ({
  width,
  height,
  src,
  alt,
  className,
  skeleton = false,
  unoptimized = true,
  ...imageProps
}: ImageProps) => {
  return (
    <NextImage
      src={src}
      alt={alt || 'image'}
      width={width}
      height={height}
      unoptimized={unoptimized}
      {...(skeleton
        ? {
            placeholder: 'blur',
            blurDataURL: makeBlurDataURL(width as number, height as number),
          }
        : {})}
      className={className}
      {...imageProps}
    />
  );
};

Image.displayName = 'Image';
