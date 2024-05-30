/*
 * @Author: kasuie
 * @Date: 2024-05-30 10:45:37
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-30 21:40:13
 * @Description: 
 */
export const showMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    variants: {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -100 },
    },
    transition: {
      duration: 0.5,
      delay: 0
    }
};

export const getMotion = (gap: number = 0.3, index: number = 0, duration: number = 0.3, animate: boolean = true) => {
  if (!animate) return {}
  return {
    ...showMotion,
    transition: {
      duration: duration,
      delay: Math.max((gap * index - gap / 2), 0)
    }
  }
}