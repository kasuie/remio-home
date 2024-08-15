/*
 * @Author: kasuie
 * @Date: 2024-08-15 23:26:15
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-15 23:28:53
 * @Description:
 */
import { onAmap } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
  const res = await onAmap("ip");

  console.log(res, "res>>>>");

  return NextResponse.json({
    data: res?.data,
    success: false,
    message: "fail",
  });
};
