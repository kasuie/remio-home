/*
 * @Author: kasuie
 * @Date: 2024-08-15 23:14:24
 * @LastEditors: kasuie
 * @LastEditTime: 2024-10-21 20:41:38
 * @Description:
 */
import request from "@/lib/fetch";
import { amapApis, oioApis } from "@/constants/api";

const AMAP_KEY = process.env.AMAP_KEY;

export const onAmap = async (
  key: string,
  params: Record<string, any> = {},
  headers?: Headers
) => {
  if (!AMAP_KEY || !amapApis[key] || !amapApis.base) return null;
  return await request.get(
    `${amapApis.base}${amapApis[key]}`,
    {
      ...params,
      key: AMAP_KEY,
    },
    headers
  );
};

export const onOio = async (
  key: string,
  params: Record<string, any> = {},
  headers?: Headers
) => {
  if (!oioApis[key] || !oioApis.base) return null;
  return await request.get(
    `${oioApis.base}${oioApis[key]}`,
    {
      ...params,
    },
    {
      headers,
    }
  );
};
