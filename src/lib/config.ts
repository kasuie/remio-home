/*
 * @Author: kasuie
 * @Date: 2024-05-24 22:10:32
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-26 01:56:15
 * @Description:
 */
import { SiteConfig } from '@/config/config';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export const CONFIG_DIR = process.env.CONFIG_DIR
  ? process.env.CONFIG_DIR
  : join(process.cwd(), "src", "config");

export async function getConfig(fileName: string) {
  const configPath = join(CONFIG_DIR, fileName);
  console.log("configPath>>>", configPath);
  if (existsSync(configPath)) {
    const config = await readFileSync(configPath, 'utf-8');
    return JSON.parse(config) as SiteConfig;
  } else {
    throw new Error(`Config file not found at ${configPath}`);
  }
}
