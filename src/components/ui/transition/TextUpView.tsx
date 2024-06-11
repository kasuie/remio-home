/*
 * @Author: kasuie
 * @Date: 2024-06-11 14:12:32
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-11 20:29:31
 * @Description:
 */
"use client";

import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import type { FC, ForwardRefExoticComponent, JSX, RefAttributes } from "react";
import { microReboundPreset } from "@kasuie/utils";

export const TextUpView: FC<
  {
    text?: string;
    children?: string | React.ReactNode;
    appear?: boolean;
    as?: keyof typeof motion;
    rootAs?: keyof typeof motion;
    eachDelay?: number;
    initialDelay?: number;
  } & JSX.IntrinsicElements["div"]
> = (props) => {
  const {
    appear = true,
    eachDelay = 0.1,
    initialDelay = 0,
    children,
    text,
    rootAs = "div",
    as = "div",
    ...rest
  } = props;

  const MotionComponent = motion[as] as ForwardRefExoticComponent<
    HTMLMotionProps<any> & RefAttributes<HTMLElement>
  >;

  const RootElement = motion[rootAs] as any;

  if (!appear) {
    return <div {...rest}>{text ?? children}</div>;
  }

  return (
    <RootElement {...rest}>
      {Array.from(text ?? (children as string)).map((char, i) => (
        <MotionComponent
          key={i}
          className="inline-block whitespace-pre"
          initial={{ transform: "translateY(10px)", opacity: 0.001 }}
          animate={{
            transform: "translateY(0px)",
            opacity: 1,
            transition: {
              ...microReboundPreset,
              duration: 0.1,
              delay: i * eachDelay + initialDelay,
            },
          }}
        >
          {char}
        </MotionComponent>
      ))}
    </RootElement>
  );
};
