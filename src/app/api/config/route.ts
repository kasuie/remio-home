/*
 * @Author: kasuie
 * @Date: 2024-05-25 21:20:01
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-27 23:31:37
 * @Description:
 */
import { getConfig, setConfig } from "@/lib/config";
import { Decrypt } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken");
  if (accessToken) {
    const config = await getConfig("config.json");
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
      const result = await setConfig(
        "config.json",
        JSON.stringify(data, null, 2)
      );
      return NextResponse.json({
        data: result,
        success: result,
        message: result ? "success" : "server error",
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
