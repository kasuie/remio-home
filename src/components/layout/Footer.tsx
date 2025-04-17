/*
 * @Author: kasuie
 * @Date: 2024-05-30 21:28:45
 * @LastEditors: kasuie
 * @LastEditTime: 2025-02-22 19:38:45
 * @Description:
 */
"use client";
import { FooterConfig } from "@/config/config";
import { ExternalLink } from "@kasuie/icon";
import { clsx } from "@kasuie/utils";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image/Image";
import Link from "next/link";

export function Footer({
  footer,
  motions,
}: {
  footer?: string | FooterConfig;
  motions?: object;
}) {
  const renderMPS = (text: string) => {
    const regex = /备\s*(\d+?)号/;
    const match = text.replace(/\s+/g, "").match(regex);
    return (
      <Link
        target="_blank"
        href={`https://beian.mps.gov.cn/#/query/webSearch?code=${match?.[1]}`}
        className="flex flex-nowrap items-center gap-1"
      >
        <Image src={"/icons/MPSICP.png"} width={14} height={14} alt="MPSICP" />
        <span>{text}</span>
      </Link>
    );
  };

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
              target="_blank"
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
              target="_blank"
              className="flex flex-nowrap items-center gap-1"
            >
              <span>{footer.ICP}</span>
            </Link>
          )}
          {footer?.MPSICP && renderMPS(footer.MPSICP)}
        </div>
      )}
    </motion.footer>
  );
}
