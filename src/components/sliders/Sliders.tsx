/*
 * @Author: kasuie
 * @Date: 2024-06-04 14:53:15
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-04 16:49:21
 * @Description: 
 */
"use client";

import { clsx, isValidUrl } from "@kasuie/utils";
import { motion } from "framer-motion";
import { SlidersConfig, Slider as SliderType } from "@/config/config";
import { Slider } from "../ui/slider/Slider";

export const Sliders = ({
    data,
    color,
    title,
    motions = {},
}: SlidersConfig & {
    motions?: object;
}) => {

    if (!data?.length) return null;

    return (
        <motion.div className="backdrop-blur-[7px] w-[95vw] md:w-[67vw] mb-8 p-4" {...motions}>
            <ul className="relative m-0 flex flex-wrap flex-col gap-2 md:gap-3">
                {data?.map((v: SliderType, index: number) => {
                    return (
                        <Slider key={index} {...v} color={v.color || color}>{v.title}</Slider>
                    );
                })}
            </ul>
        </motion.div>
    );
};
