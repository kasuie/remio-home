/*
 * @Author: kasuie
 * @Date: 2024-06-11 16:10:36
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-11 17:51:34
 * @Description: 
 */
"use client";
import { transitions } from "@kasuie/utils";
import { createTransitionView } from "./factor";
import { BaseTransitionProps } from "./typings";

export const ATransition = (props: BaseTransitionProps) => {
    const transition = props?.transitionkey ? transitions[props.transitionkey] : transitions.up;
    const Transition: any = createTransitionView(transition as any)
    return <Transition {...props}></Transition>
}