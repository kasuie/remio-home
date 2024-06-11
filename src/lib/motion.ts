/*
 * @Author: kasuie
 * @Date: 2024-05-30 10:45:37
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-11 16:23:15
 * @Description:
 */
export const showMotion = {
  initial: "initial",
  animate: "animate",
  exit: "exit",
  variants: {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  },
  transition: {
    duration: 0.5,
    delay: 0,
  },
};

export const getMotion = (
  gap: number = 0.3,
  index: number = 0,
  duration: number = 0.3,
  animate: boolean = true
) => {
  if (!animate) return {};
  return {
    ...showMotion,
    transition: {
      ...showMotion.transition,
      duration: duration,
      delay: Math.max(gap * index - gap / 2, 0),
    },
  };
};
