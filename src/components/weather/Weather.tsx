/*
 * @Author: kasuie
 * @Date: 2024-08-17 14:10:21
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-17 21:29:04
 * @Description:
 */
"use client";
import { useEffect, useState } from "react";
import request from "@/lib/fetch";
import dynamic from "next/dynamic";

const SunFill = dynamic(async () => (await import("@kasuie/icon")).SunFill);
const CloudSun = dynamic(async () => (await import("@kasuie/icon")).CloudSun);
const CloudSunRain = dynamic(
  async () => (await import("@kasuie/icon")).CloudSunRain
);
const Snowflake = dynamic(async () => (await import("@kasuie/icon")).Snowflake);
const CloudMoon = dynamic(async () => (await import("@kasuie/icon")).CloudMoon);
const CloudMoonRain = dynamic(
  async () => (await import("@kasuie/icon")).CloudMoonRain
);
const CloudRain = dynamic(async () => (await import("@kasuie/icon")).CloudRain);
const CloudBolt = dynamic(async () => (await import("@kasuie/icon")).CloudBolt);
const Hurricane = dynamic(async () => (await import("@kasuie/icon")).Hurricane);
const Smog = dynamic(async () => (await import("@kasuie/icon")).Smog);
const Wind = dynamic(async () => (await import("@kasuie/icon")).Wind);
const CloudMeatball = dynamic(
  async () => (await import("@kasuie/icon")).CloudMeatball
);
const CloudShowersHeavy = dynamic(
  async () => (await import("@kasuie/icon")).CloudShowersHeavy
);
export const Weather = ({ size = 18 }: { size: number }) => {
  const [weatherInfo, setWeatherInfo] = useState<Record<string, string>>();

  const renderIcon = (weather: string) => {
    const props = {
      size,
      color: "#fff",
    };
    const hours = new Date().getHours();
    if (["多云"].includes(weather)) {
      return hours < 19 && hours > 6 ? (
        <CloudSun {...props} />
      ) : (
        <CloudMoon {...props} />
      );
    } else if (["雨"].includes(weather)) {
      return hours < 19 && hours > 6 ? (
        <CloudSunRain {...props} />
      ) : (
        <CloudMoonRain {...props} />
      );
    } else {
      return hours < 19 && hours > 6 ? (
        <SunFill {...props} />
      ) : (
        <CloudMoon {...props} />
      );
    }
  };

  useEffect(() => {
    !weatherInfo &&
      request.get("/api/weather").then((res) => {
        if (res.success) {
          console.log(res.data);
          setWeatherInfo(res.data);
        }
      });
  }, []);

  if (!weatherInfo) return null;

  return (
    <div
      style={{
        backgroundColor: "rgba(var(--mio-main), 0.1)",
      }}
      className="fixed right-4 top-4 z-10 flex select-none items-center gap-2 rounded-md px-2 py-1 backdrop-blur"
    >
      <div className="flex items-center text-white">
        <span className="text-xs">
          {weatherInfo?.city && weatherInfo?.city.replace("市", "")}
        </span>
        <span>·</span>
        <span className="text-xs">
          {weatherInfo?.temperature}
          <sup>℃</sup>{" "}
        </span>
      </div>
      {weatherInfo && renderIcon(weatherInfo.weather)}
    </div>
  );
};
