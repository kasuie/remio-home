/*
 * @Author: kasuie
 * @Date: 2024-06-06 21:29:09
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-06 21:29:54
 * @Description:
 */
"use client";

import { softBouncePreset } from "@/lib/spring";

import { createTransitionView } from "./factor";

export const BottomToUpView = createTransitionView({
  from: {
    y: 50,
    opacity: 0.001,
  },
  to: {
    y: 0,
    opacity: 1,
  },
  preset: softBouncePreset,
});
