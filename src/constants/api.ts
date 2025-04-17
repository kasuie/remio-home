/*
 * @Author: kasuie
 * @Date: 2024-08-15 22:20:32
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-16 14:56:57
 * @Description:
 */
export type AmapApisKey = typeof amapApis;
export type OioApisKey = typeof oioApis;

export const amapApis: Record<string, string> = {
  base: "https://restapi.amap.com",
  weather: "/v3/weather/weatherInfo",
  ip: "/v3/ip",
};

export const oioApis: Record<string, string> = {
  base: "https://api.oioweb.cn",
  weather: "/api/weather/GetWeather",
};
