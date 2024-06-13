/*
 * @Author: kasuie
 * @Date: 2024-06-13 10:42:52
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 21:13:22
 * @Description:
 */
"use client";
import { Input as UInput, type InputProps } from "@nextui-org/input";

export const Input = ({
  className = "",
  ...inputProps
}: {
  className?: string;
} & InputProps) => {
  return <UInput className={className} {...inputProps} />;
};
