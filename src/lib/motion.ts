/*
 * @Author: kasuie
 * @Date: 2024-05-30 10:45:37
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-30 11:47:09
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
      duration: 0.5
    }
};