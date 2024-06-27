/*
 * @Author: kasuie
 * @Date: 2024-06-24 22:12:19
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-27 22:25:19
 * @Description:
 */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "@kasuie/utils";

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
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, [onSwitch]);

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
        className="relative flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white/15 opacity-75 shadow-[2px_2px_10px_rgba(0,0,0,0.13)] transition duration-300 hover:opacity-100"
      >
        <div
          className={clsx(
            "z-2 flex h-full w-full items-center justify-center transition duration-300",
            {
              "opacity-0": checked,
            }
          )}
        >
          <svg
            width={18}
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            viewBox="0 0 75 75"
          >
            <path
              d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
              style={{
                stroke: "#fff",
                strokeWidth: 5,
                strokeLinejoin: "round",
                fill: "#fff",
              }}
            ></path>
            <path
              d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
              style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: 5,
                strokeLinecap: "round",
              }}
            ></path>
          </svg>
        </div>
        <div
          className={clsx(
            "z-3 absolute flex h-full w-full items-center justify-center opacity-0 transition duration-300",
            {
              "opacity-100": checked,
            }
          )}
        >
          <svg
            width={18}
            version="1.0"
            viewBox="0 0 75 75"
            stroke="#fff"
            strokeWidth="5"
          >
            <path
              d="m39,14-17,15H6V48H22l17,15z"
              fill="#fff"
              strokeLinejoin="round"
            ></path>
            <path
              d="m49,26 20,24m0-24-20,24"
              fill="#fff"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
