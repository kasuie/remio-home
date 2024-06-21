/*
 * @Author: kasuie
 * @Date: 2024-06-11 15:49:09
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-21 21:57:20
 * @Description:
 */
"use client";

import { useEffect, useState } from "react";
import { TextUpView } from "../ui/transition/TextUpView";
import { SubTitleConfig } from "@/config/config";
import { clsx } from "@kasuie/utils";

interface Item {
  text: string;
  rootAs: string | any;
  length?: number;
  initialDelay?: number;
}

export function HoriTextEffect({
  content,
  desc,
  gapDelay = 0.05,
  loading,
}: SubTitleConfig) {
  const [h1s, setH1s] = useState<Item[]>();

  const [ps, setPs] = useState<Item[]>();

  const [data, setData] = useState<Item[]>();

  useEffect(() => {
    if (content) {
      const arr: Item[] =
        content?.split(";").map((v: string) => {
          return {
            text: v,
            rootAs: "h1",
            length: v.length,
          };
        }) || [];
      if (arr?.length) setH1s(arr);
    }
  }, [content]);

  useEffect(() => {
    if (desc) {
      const arr: Item[] =
        desc?.split(";").map((v: string) => {
          return {
            text: v,
            rootAs: "p",
            length: v.length,
          };
        }) || [];
      if (arr?.length) setPs(arr);
    }
  }, [desc]);

  useEffect(() => {
    const temp = h1s?.concat(ps || []) || [];
    temp.reduce((prev: number, curr: Item, index: number) => {
      temp[index].initialDelay = prev * gapDelay;
      return (curr?.length || 0) + prev;
    }, 0);
    setData(temp);
  }, [h1s, ps]);

  return (
    <div className="max-w-2xl z-[1] text-white">
      {data?.map((v: Item, i: number) => {
        return (
          <TextUpView
            rootAs={v.rootAs}
            className={clsx("", {
              "mb-6 text-2xl leading-relaxed md:text-3xl md:leading-loose": v.rootAs == "h1",
              "text-sm opacity-80 leading-relaxed": v.rootAs == "p",
            })}
            key={v.text}
            as="span"
            appear={!!loading && !!gapDelay}
            initialDelay={v.initialDelay}
            eachDelay={gapDelay}
          >
            {v.text}
          </TextUpView>
        );
      })}
    </div>
  );
}
