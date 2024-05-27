/*
 * @Author: kasuie
 * @Date: 2024-05-27 10:11:22
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-27 10:16:29
 * @Description: 
 */
'use client';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  return (
    <div className="w-full h-screen flex items-center justify-center">{error?.message || `哎呀，非常抱歉~出现了一些错误::>_<::`}</div>
  );
}
