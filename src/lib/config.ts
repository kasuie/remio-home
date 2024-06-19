/*
 * @Author: kasuie
 * @Date: 2024-05-24 22:10:32
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-19 16:19:24
 * @Description:
 */
import { AppConfig } from "@/config/config";
import { dateFormat } from "@kasuie/utils";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { defaultAppConfig } from "./rules";

export const CONFIG_DIR = process.env.CONFIG_DIR
  ? process.env.CONFIG_DIR
  : join(process.cwd(), "src", "config");

export async function getConfig(fileName: string, throwError: boolean = false) {
  const configPath = join(CONFIG_DIR, fileName);
  console.log(
    "get path>>>",
    configPath,
    dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss")
  );
  if (existsSync(configPath)) {
    const config = await readFileSync(configPath, "utf-8");
    return JSON.parse(config) as AppConfig;
  } else {
    if (throwError) {
      throw new Error(`无法找到配置文件：${configPath}，请检查~`);
    } else {
      return defaultAppConfig;
    }
  }
}

export async function setConfig(fileName: string, appConfig: string) {
  const configPath = join(CONFIG_DIR, fileName);
  console.log(
    "set path>>>",
    configPath,
    dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss")
  );
  if (existsSync(configPath)) {
    try {
      writeFileSync(configPath, appConfig);
      return true;
    } catch (err) {
      console.error(`写入失败：${err}，请检查~`);
      return false;
    }
  } else {
    console.error(`无法找到配置文件：${configPath}，请检查~`);
    return false;
  }
}
