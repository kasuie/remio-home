/*
 * @Author: kasuie
 * @Date: 2024-05-25 21:20:01
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-12 21:07:45
 * @Description:
 */
import { getConfig, setConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async () => {
  const config = await getConfig("config.json");
  return NextResponse.json({
    data: config,
    success: true,
    message: "操作成功",
  });
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const result = await setConfig("config.json", JSON.stringify(data, null, 2));
  return NextResponse.json({
    data: result,
    success: result,
  });
};
