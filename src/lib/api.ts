/*
 * @Author: kasuie
 * @Date: 2024-08-15 23:14:24
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-16 00:01:01
 * @Description:
 */
import request from "@/lib/fetch";
import { amapApis } from "@/constants/api";

const AMAP_KEY = process.env.AMAP_KEY;

export const onAmap = async (key: string, params: Record<string, any> = {}) => {
  if (!AMAP_KEY || !amapApis[key] || !amapApis.base) return null;
  const res = await request.get({
    url: `${amapApis.base}${amapApis[key]}`,
    params: {
      ...params,
      key: AMAP_KEY,
    },
  });
  return res;
};
