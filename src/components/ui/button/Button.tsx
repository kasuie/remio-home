/*
 * @Author: kasuie
 * @Date: 2024-06-14 11:06:48
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-14 21:44:14
 * @Description:
 */
"use client";
import { ButtonHTMLAttributes } from "react";
import { clsx } from "@kasuie/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button = ({
  className,
  children,
  loading,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "flex min-w-24 items-center justify-center gap-[2px] border-none bg-[var(--primary-color)] px-3 py-2 tracking-[4px] outline-none duration-150 hover:opacity-85",
        {
          [`${className}`]: className,
          "rounded-sm": !className,
          "opacity-80": loading
        }
      )}
      disabled={loading}
      onClick={(e) => {
        !loading && onClick && onClick(e);
      }}
      {...props}
    >
      <span>{children}</span>
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 ease-linear"></span>
      )}
    </button>
  );
};
