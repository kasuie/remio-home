/*
 * @Author: kasuie
 * @Date: 2024-05-24 09:39:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-24 10:40:59
 * @Description:
 */
'use client';
import { isClientSide, aSakura, onDebug } from '@kasuie/utils';

export function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (isClientSide) { 
    aSakura();
    onDebug();
  }

  return <>{children}</>;
}
