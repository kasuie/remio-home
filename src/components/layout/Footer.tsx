/*
 * @Author: kasuie
 * @Date: 2024-05-30 21:28:45
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 19:16:27
 * @Description:
 */
"use client";
import { FooterConfig } from "@/config/config";
import { ExternalLink } from "@kasuie/icon";
import { clsx } from "@kasuie/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export function Footer({ footer, motions }: { footer?: string | FooterConfig; motions?: object }) {

  return (
    <motion.footer
      {...motions}
      className="absolute text-white/90 bottom-2 left-1/2 !translate-x-[-50%] cursor-pointer select-none whitespace-nowrap text-sm"
    >
      {
        typeof footer === "string" ? footer : (
          <div className={clsx("flex items-center gap-1 flex-col", {
            "!flex-row !gap-4": footer?.direction == "row",
            "!flex-row-reverse !gap-4": footer?.direction == "row-reverse",
            "!flex-col-reverse": footer?.direction == "col-reverse"
          })}>
            {
              footer?.url ? <Link href={footer.url} className="flex flex-nowrap gap-1 items-center"><span>{footer.text}</span>{footer?.isExternal && <ExternalLink size={12} />}</Link> : <span>{footer?.text}</span>
            }
            {
              footer?.ICP && <Link href={"https://beian.miit.gov.cn"} className="flex flex-nowrap gap-1 items-center"><span>{footer.ICP}</span></Link>
            }
          </div>
        )
      }
    </motion.footer>
  );
}
