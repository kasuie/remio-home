/*
 * @Author: kasuie
 * @Date: 2024-06-15 11:20:01
 * @LastEditors: kasuie
 * @LastEditTime: 2024-07-05 15:58:50
 * @Description:
 */
import { Decrypt } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { checkCode } = await req.json();
  if (!checkCode) {
    return NextResponse.json({
      data: null,
      message: "checkCode is required",
      success: false,
    });
  }
  const password = Decrypt(checkCode, process.env.PASSWORD);

  if (password === process.env.PASSWORD) {
    const response = NextResponse.json({
      data: true,
      message: "success",
      success: true,
    });

    response.cookies.set("accessToken", checkCode, {
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });

    return response;
  } else {
    return NextResponse.json({
      data: null,
      message: "fail",
      success: false,
    });
  }
};
