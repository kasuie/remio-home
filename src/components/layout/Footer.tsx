/*
 * @Author: kasuie
 * @Date: 2024-05-30 21:28:45
 * @LastEditors: kasuie
 * @LastEditTime: 2024-07-05 16:00:18
 * @Description:
 */
"use client";
import { FooterConfig } from "@/config/config";
import { ExternalLink } from "@kasuie/icon";
import { clsx } from "@kasuie/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export function Footer({
  footer,
  motions,
}: {
  footer?: string | FooterConfig;
  motions?: object;
}) {
  return (
    <motion.footer
      {...motions}
      className="absolute bottom-2 left-1/2 z-10 !translate-x-[-50%] cursor-pointer select-none whitespace-nowrap text-sm text-white/90"
    >
      {typeof footer === "string" ? (
        footer
      ) : (
        <div
          className={clsx("flex flex-col items-center gap-1", {
            "!flex-row !gap-4": footer?.direction == "row",
            "!flex-row-reverse !gap-4": footer?.direction == "row-reverse",
            "!flex-col-reverse": footer?.direction == "col-reverse",
          })}
        >
          {footer?.url ? (
            <Link
              href={footer.url}
              className="flex flex-nowrap items-center gap-1"
            >
              <span>{footer.text}</span>
              {footer?.isExternal && <ExternalLink size={12} />}
            </Link>
          ) : (
            <span>{footer?.text}</span>
          )}
          {footer?.ICP && (
            <Link
              href={"https://beian.miit.gov.cn"}
              className="flex flex-nowrap items-center gap-1"
            >
              <span>{footer.ICP}</span>
            </Link>
          )}
        </div>
      )}
    </motion.footer>
  );
}
