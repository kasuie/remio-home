/*
 * @Author: kasuie
 * @Date: 2024-05-24 22:10:32
 * @LastEditors: kasuie
 * @LastEditTime: 2025-04-17 16:57:12
 * @Description:
 */
import { AppConfig, Site } from "@/config/config";
import { dateFormat } from "@kasuie/utils";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { defaultAppConfig } from "./rules";
import { AppConfigService } from "./service";

export const CONFIG_DIR = process.env.CONFIG_DIR
  ? process.env.CONFIG_DIR
  : join(process.cwd(), "src", "config");

export const IS_DATABASE = !!process.env.PG_DATABASE_URL;

const FILE_NAME = "config.json";
const Service = new AppConfigService();

export async function getConfig(throwError: boolean = false) {
  if (IS_DATABASE) {
    console.log(
      "Get Db conifg:",
      dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss")
    );
    const dbConfig = await getDbConfig();
    return dbConfig || defaultAppConfig;
  } else {
    const configPath = join(CONFIG_DIR, FILE_NAME);
    console.log(
      "Get File conifg:",
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
}

export async function setConfig(appConfig: AppConfig) {
  if (IS_DATABASE) {
    try {
      const res = await Service.upsertConfig({
        ...appConfig,
        version: "latest",
      });
      return !!res;
    } catch (error) {
      console.log(error, "errro>>");
      return false;
    }
  } else {
    const appConfigStr = JSON.stringify(appConfig, null, 2);
    const configPath = join(CONFIG_DIR, FILE_NAME);
    console.log(
      "Set File Config>>>",
      configPath,
      dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss")
    );
    try {
      writeFileSync(configPath, appConfigStr);
      return true;
    } catch (err) {
      console.error(`写入失败：${err}，请检查~`);
      return false;
    }
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
    footer,
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

  let footers = 0;
  if (typeof footer === "object" && footer.direction?.includes("col")) {
    if (footer.ICP) ++footers;
    if (footer.MPSICP) ++footers;
    if (footer.text) ++footers;
  }

  return {
    ...others,
    footers,
    footer,
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

export const getDbConfig = async (ver: string = "latest") => {
  try {
    return await Service.getConfigByVer(true, ver);
  } catch (error) {
    const { code } = (error as Record<string, any>) || {};
    if (code === "42703") {
      Service.syncTable();
    } else if (code === "42P01") {
      Service.syncTable(true);
    } else {
      console.log("error>>>", error);
    }
    return null;
  }
};
