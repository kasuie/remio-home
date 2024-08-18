/*
 * @Author: kasuie
 * @Date: 2024-05-24 22:10:32
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-18 15:27:33
 * @Description:
 */
import { AppConfig, Site } from "@/config/config";
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
  try {
    writeFileSync(configPath, appConfig);
    return true;
  } catch (err) {
    console.error(`写入失败：${err}，请检查~`);
    return false;
  }
}

export const transformConfig = (appConfig: AppConfig) => {
  const {
    sites = [],
    layoutConfig = {},
    sitesConfig = {},
    keywords,
    description,
    favicon,
    domain,
    bgConfig,
    globalStyle,
    ...others
  } = appConfig;

  const primaryColor: string = globalStyle?.primaryColor || "#229fff";

  /** 布局配置结构于对象中 */
  const { istTransition = true, gapSize = "md", style } = layoutConfig;

  /** 样式变量及样式 */
  const varStyle: Record<string, string> = {
    "--primary-color": primaryColor,
  };

  /** 处理站点 */
  const index = sites.findIndex((v: Site) => !v.url);
  let staticSites: Site[] = [],
    modalSites: Site[] = [];
  if (index > -1) {
    if (!sitesConfig.modal) {
      staticSites = sites.filter((_, i) => i !== index);
    } else {
      staticSites = sites.slice(0, index + 1);
      modalSites = sites.slice(index + 1);
    }
  } else {
    staticSites = sites;
  }

  /** 背景处理 */
  let bgs: string[] = [],
    mbgs: string[] = [];
  if (!bgConfig?.bg) {
    bgs.push("https://s2.loli.net/2024/06/21/euQ48saP7UgMyDr.webp");
  } else if (typeof bgConfig.bg === "string") {
    bgs.push(bgConfig.bg);
  } else if (Array.isArray(bgConfig.bg)) {
    bgs = bgConfig.bg;
  }
  if (!bgConfig?.mbg) {
    mbgs.push("https://s2.loli.net/2024/06/21/59b6eRscAvQWHT1.webp");
  } else if (typeof bgConfig.mbg === "string") {
    mbgs.push(bgConfig.mbg);
  } else if (Array.isArray(bgConfig.mbg)) {
    mbgs = bgConfig.mbg;
  }

  return {
    ...others,
    bgConfig: { ...bgConfig, bgs, mbgs },
    sitesConfig,
    primaryColor,
    globalStyle,
    istTransition,
    gapSize,
    style,
    varStyle,
    staticSites,
    modalSites,
  };
};

export const mergeConfig = (appConfig: AppConfig) => {
  return Object.assign({ ...defaultAppConfig }, appConfig);
};
