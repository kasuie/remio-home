/*
 * @Author: kasuie
 * @Date: 2024-07-05 17:45:15
 * @LastEditors: kasuie
 * @LastEditTime: 2024-07-05 17:45:15
 * @Description:
 */
"use client";
import { Textarea as UTextarea, type TextAreaProps } from "@nextui-org/input";

export const Textarea = ({
  className = "",
  ...TextAreaProps
}: {
  className?: string;
} & TextAreaProps) => {
  return <UTextarea className={className} {...TextAreaProps} />;
};
