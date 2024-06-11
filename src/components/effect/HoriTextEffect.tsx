/*
 * @Author: kasuie
 * @Date: 2024-06-11 15:49:09
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-11 18:02:35
 * @Description: 
 */
"use client";

import { useEffect, useState } from "react";
import { TextUpView } from "../ui/transition/TextUpView";

export function HoriTextEffect({ text, desc }: { text?: string, desc?: string }) {

  const [h1s, setH1s] = useState<string[]>();

  const [ps, setPs] = useState<string[]>();

  useEffect(() => {
    if (text) {
      const arr = text?.split(";") || [];
      if (arr?.length) setH1s(arr);
    }
  }, [text])

  useEffect(() => {
    if (desc) {
      const arr = desc?.split(";") || [];
      if (arr?.length) setPs(arr);
    }
  }, [desc])

  return (
    <div>
      {
        h1s?.map((v: string, index: number) => {
          return <TextUpView
            key={v}
            eachDelay={0.05}
          >
            {v}
          </TextUpView>
        })
      }
      {
        ps?.map((v: string, index: number) => {
          return <TextUpView
            key={v}
            eachDelay={0.05}
          >
            {v}
          </TextUpView>
        })
      }
    </div>
  );
}
