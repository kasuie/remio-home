/*
 * @Author: kasuie
 * @Date: 2024-06-04 10:29:21
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-17 21:17:44
 * @Description:
 */
"use client";
import { useTheme } from "next-themes";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { clsx, storage } from "@kasuie/utils";
import { motion } from "framer-motion";

export const ThemeSwitcher = ({
  className = "relative",
  size = 8,
  theme,
  motions,
}: {
  className?: string;
  size?: number;
  theme?: string;
  motions?: object;
}) => {
  const { setTheme } = useTheme();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let ltheme =
      theme == "switcher" ? storage.l.get("theme") : theme || "light";
    if (theme != "switcher") setTheme(ltheme);
    setChecked(ltheme == "dark" ? true : false);
  }, []);

  const onChange = ({ target: { checked } }: BaseSyntheticEvent) => {
    if (checked) {
      setTheme("dark");
      setChecked(true);
    } else {
      setTheme("light");
      setChecked(false);
    }
  };

  if (theme != "switcher") return null;

  return (
    <motion.label
      {...motions}
      className={`z-10 inline-flex cursor-pointer items-center ${className}`}
    >
      <input
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
        type="checkbox"
      />
      <div
        className={clsx(
          `peer-checked:after:rotate-360 peer overflow-hidden rounded-full bg-transparent opacity-75 shadow-lg outline-none ring-0 duration-150 before:absolute before:left-0 before:top-[calc(50%+4px)] before:flex before:-translate-y-1/2 before:items-center before:justify-center before:rounded-full before:bg-white/15 before:transition-all before:duration-150 before:content-['☀️'] after:absolute after:right-0 after:top-1 after:flex after:translate-y-full after:items-center after:justify-center after:rounded-full after:bg-white/15 after:opacity-0 after:transition-all after:duration-150 after:content-['🌙'] hover:opacity-100  peer-checked:before:-translate-y-full peer-checked:before:rotate-90 peer-checked:before:opacity-0 peer-checked:after:translate-y-0 peer-checked:after:opacity-100`,
          {
            "h-8 w-8": size == 8,
            "after:h-8 after:w-8": size == 8,
            "before:h-8 before:w-8": size == 8,
          }
        )}
      ></div>
    </motion.label>
  );
};
