/*
 * @Author: kasuie
 * @Date: 2024-06-24 22:12:19
 * @LastEditors: kasuie
 * @LastEditTime: 2024-10-22 21:33:45
 * @Description:
 */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "@kasuie/utils";
import { SpeakerLoud, SpeakerOff } from "@kasuie/icon";

export const MuteSwitcher = ({
  className = "relative",
  size = 8,
  onSwitch,
  motions,
}: {
  className?: string;
  size?: number;
  onSwitch?: Function;
  motions?: object;
}) => {
  const [checked, setChecked] = useState(true);

  // useEffect(() => {
  //   setChecked(true);
  // }, [onSwitch]);

  const onChange = () => {
    if (!checked) {
      setChecked(true);
      onSwitch?.(true);
    } else {
      setChecked(false);
      onSwitch?.(false);
    }
  };

  return (
    <motion.div {...motions} className={className}>
      <div
        onClick={onChange}
        className="relative z-10 flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white/15 opacity-75 shadow-[2px_2px_10px_rgba(0,0,0,0.13)] transition duration-300 hover:opacity-100"
      >
        <div
          className={clsx(
            "z-2 flex h-full w-full items-center justify-center transition duration-300",
            {
              "opacity-0": checked,
            }
          )}
        >
          <SpeakerLoud size={16} />
        </div>
        <div
          className={clsx(
            "z-3 absolute flex h-full w-full items-center justify-center opacity-0 transition duration-300",
            {
              "opacity-100": checked,
            }
          )}
        >
          <SpeakerOff size={16} />
        </div>
      </div>
    </motion.div>
  );
};
