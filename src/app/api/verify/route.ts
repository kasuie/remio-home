/*
 * @Author: kasuie
 * @Date: 2024-06-15 11:20:01
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-15 16:51:00
 * @Description:
 */
import { Decrypt } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { checkCode } = await req.json();
  if (!checkCode) {
    return NextResponse.json({
      message: "checkCode is required",
      success: false,
    });
  }
  const password = Decrypt(checkCode, process.env.PASSWORD);

  if (password === process.env.PASSWORD) {
    const response = NextResponse.json({
      message: "success",
      success: true,
    });

    response.cookies.set("accessToken", checkCode, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });

    return response;
  } else {
    return NextResponse.json({
      message: "fail",
      success: false,
    });
  }
};
