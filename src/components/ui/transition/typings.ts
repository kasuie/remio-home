/*
 * @Author: kasuie
 * @Date: 2024-06-06 21:24:37
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-06 21:24:41
 * @Description:
 */
import type { HTMLMotionProps, m, TargetAndTransition } from "framer-motion";

export interface BaseTransitionProps extends HTMLMotionProps<"div"> {
  duration?: number;

  timeout?: {
    exit?: number;
    enter?: number;
  };

  delay?: number;

  animation?: {
    enter?: TargetAndTransition["transition"];
    exit?: TargetAndTransition["transition"];
  };

  lcpOptimization?: boolean;
  as?: keyof typeof m;
}
