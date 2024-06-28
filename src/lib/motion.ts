/*
 * @Author: kasuie
 * @Date: 2024-05-30 10:45:37
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-28 10:47:10
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
  animate: boolean = true,
  key: string = "toBottom"
) => {
  if (!animate) return {};
  const motions = createMotions(key);
  return {
    ...motions,
    transition: {
      ...motions.transition,
      duration: duration,
      delay: Math.max(gap * index - gap / 2, 0),
    },
  };
};

const createMotions = (key: string) => {
  let motions = Object.assign({}, showMotion);
  switch (key) {
    case "toTop":
      motions.variants = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 30 },
      };
      return motions;
    case "toBottom":
      return motions;
    default:
      return motions;
  }
};

export const variants = {
  default: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  toBottom: {
    initial: { opacity: 0.5, y: -15, scale: 1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0.5, y: 15, scale: 1 },
  },
  toTop: {
    initial: { opacity: 0.5, y: 15, scale: 1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0.5, y: -15, scale: 1 },
  },
  toLeft: {
    initial: { opacity: 0.5, x: 15, scale: 1 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0.5, x: -15, scale: 1 },
  },
  toRight: {
    initial: { opacity: 0.5, x: -15, scale: 1 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0.5, x: 15, scale: 1 },
  },
  toIn: {
    initial: { opacity: 0.5, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0.5, scale: 0.9 },
  },
  toOut: {
    initial: { opacity: 0.5, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0.5, scale: 1.1 },
  },
  toInOut: {
    initial: { opacity: 0.5, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0.5, scale: 1.1 },
  },
  toOutIn: {
    initial: { opacity: 0.5, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0.5, scale: 0.9 },
  },
};
