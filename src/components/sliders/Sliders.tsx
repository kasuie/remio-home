/*
 * @Author: kasuie
 * @Date: 2024-06-04 14:53:15
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-18 11:39:49
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
  cardOpacity,
  column = 2,
  motions = {},
}: SlidersConfig & {
  motions?: object;
  cardOpacity?: number;
}) => {
  if (!data?.length) return null;

  return (
    <motion.div
      style={{
        backgroundColor: `rgba(var(--mio-main), ${cardOpacity})`,
      }}
      className="z-[1] mb-8 w-[95vw] rounded p-4 pb-8 text-white/90 shadow-mio-link backdrop-blur md:w-[65vw]"
      {...motions}
    >
      {title && (
        <div className="mb-2 flex flex-nowrap items-center gap-2">
            <span className="ml-1 h-2 w-2 rounded-full bg-[var(--primary-color)]"></span>
          <span className="text-sm">{title}</span>
        </div>
      )}
      <ul className="relative flex flex-wrap justify-between gap-y-2 px-[2px]">
        {data?.map((v: SliderType, index: number) => {
          return (
            <Slider
              key={index}
              warpClass={clsx("", {
                "md:w-[49%]": column === 2,
                "lg:w-[33%] md:w-[49%]": column === 3,
                "xl:w-[24%] lg:w-[33%] md:w-[49%]": column >= 4,
              })}
              {...v}
              color={v.color || color}
            >
              {v.title}
            </Slider>
          );
        })}
      </ul>
    </motion.div>
  );
};
