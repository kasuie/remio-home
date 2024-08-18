/*
 * @Author: kasuie
 * @Date: 2024-08-15 23:26:15
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-18 14:36:18
 * @Description:
 */
import { onAmap, onOio } from "@/lib/api";
import { NextResponse } from "next/server";

export const revalidate = 60;

const AMAP_KEY = process.env.AMAP_KEY;

export const GET = async () => {
  if (!AMAP_KEY) {
    const res: any = await onOio("weather");
    if (res?.code == 200 && res?.result) {
      const {
        result: { city, condition },
      } = res;
      return NextResponse.json({
        data: {
          apiKey: "oio",
          province: city?.Province,
          city: city?.City,
          carrier: city?.Carrier,
          adcode: null,
          weather: condition?.day_weather,
          temperature: condition?.max_degree,
          winddirection: condition?.day_wind_direction,
          windpower: condition?.day_wind_power,
          humidity: condition?.aqi?.aqi,
          reporttime: condition?.aqi?.update_time,
          temperature_float: null,
          humidity_float: null,
        },
        success: true,
        message: "success",
      });
    } else {
      return NextResponse.json({
        data: "error: oio",
        success: false,
        message: "fail",
      });
    }
  }

  const resIp: any = (await onAmap("ip")) || {};

  if (resIp?.status != "1")
    return NextResponse.json({
      data: "error: ip",
      success: false,
      message: "fail",
    });

  const resWea: any = await onAmap("weather", {
    city: resIp.adcode,
  });

  if (resWea?.status != "1")
    return NextResponse.json({
      data: "error: weather",
      success: false,
      message: "fail",
    });

  return NextResponse.json({
    data: resWea?.lives?.length && { apiKey: "amap", ...resWea?.lives[0] },
    success: true,
    message: "success",
  });
};
