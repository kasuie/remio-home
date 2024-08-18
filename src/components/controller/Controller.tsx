/*
 * @Author: kasuie
 * @Date: 2024-08-17 10:47:06
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-18 14:35:35
 * @Description:
 */
"use client";
import { ExternalLink, Setting } from "@kasuie/icon";
import { clsx } from "@kasuie/utils";
import { motion } from "framer-motion";
import { ThemeSwitcher } from "../ui/switcher/ThemeSwitcher";
import { getMotion, showMotion } from "@/lib/motion";
import dynamic from "next/dynamic";

const MuteSwitcher = dynamic(
  async () =>
    (await import("@/components/ui/switcher/MuteSwitcher")).MuteSwitcher
);

export function Controller({
  motions,
  theme,
  hasVideo,
  handleMuteUnmute,
}: {
  motions?: object;
  theme?: string;
  hasVideo?: boolean;
  handleMuteUnmute?: Function;
}) {
  const hidden = !hasVideo && theme != "switcher";

  return (
    <motion.div
      {...motions}
      className={clsx(
        "group fixed bottom-6 right-6 z-10 flex cursor-pointer select-none flex-col items-center justify-center gap-2 whitespace-nowrap text-sm text-white/90",
        {
          hidden: hidden,
        }
      )}
    >
      <div className="hidden h-0 flex-col gap-2 duration-300 group-hover:flex group-hover:h-auto">
        <ThemeSwitcher theme={theme} />
        {hasVideo && <MuteSwitcher onSwitch={handleMuteUnmute} />}
      </div>
      <div className="px-2">
        <Setting size={22} />
      </div>
    </motion.div>
  );
}
