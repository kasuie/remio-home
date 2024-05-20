/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:57:31
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-20 16:57:37
 * @Description:
 */
export const isClientSide = typeof window !== 'undefined';
export const isServerSide = !isClientSide;

export const isDev = process.env.NODE_ENV === 'development';
