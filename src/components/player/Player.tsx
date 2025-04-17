/*
 * @Author: kasuie
 * @Date: 2024-08-18 11:34:25
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-18 12:25:09
 * @Description:
 */
"use client";
import { useEffect, useState } from "react";
import request from "@/lib/fetch";
import dynamic from "next/dynamic";

export const Player = ({ size = 18 }: { size: number }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(var(--mio-main), 0.1)",
      }}
      className="fixed right-4 top-4 z-10 flex select-none items-center gap-2 rounded-md px-2 py-1 backdrop-blur"
    >
      45555
    </div>
  );
};
