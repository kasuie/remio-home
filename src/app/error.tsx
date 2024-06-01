/*
 * @Author: kasuie
 * @Date: 2024-05-27 10:11:22
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-27 17:45:40
 * @Description:
 */
"use client";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center px-5 md:px-20">
      {error?.message || `哎呀，非常抱歉~出现了一些错误::>_<::`}
    </div>
  );
}
