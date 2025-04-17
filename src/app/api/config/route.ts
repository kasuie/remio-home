/*
 * @Author: kasuie
 * @Date: 2024-05-25 21:20:01
 * @LastEditors: kasuie
 * @LastEditTime: 2025-04-17 17:41:38
 * @Description:
 */
import { getConfig, setConfig } from "@/lib/config";
import { Decrypt } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken");
  if (accessToken) {
    const config = await getConfig();
    return NextResponse.json({
      data: config,
      success: true,
      message: "success",
    });
  } else {
    return NextResponse.json({
      data: null,
      success: false,
      message: "fail",
    });
  }
};

export const POST = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken");
  if (accessToken?.value) {
    const password = Decrypt(accessToken.value, process.env.PASSWORD);
    if (password === process.env.PASSWORD) {
      const data = await req.json();
      const result = await setConfig(data);
      return NextResponse.json({
        data: result,
        success: result,
        message: result ? "success" : "保存失败，可能是没有写入权限",
      });
    } else {
      return NextResponse.json({
        data: 1,
        success: false,
        message: "fail，auth error",
      });
    }
  }
  return NextResponse.json({
    data: 0,
    success: false,
    message: "fail",
  });
};
