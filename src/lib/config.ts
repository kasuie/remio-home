/*
 * @Author: kasuie
 * @Date: 2024-05-24 22:10:32
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-25 17:54:49
 * @Description:
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export const CONFIG_DIR = process.env.CONFIG_DIR
  ? process.env.CONFIG_DIR
  : process.cwd();

export function getConfig(fileName: string) {
  const configPath = join(CONFIG_DIR, fileName);
  console.log(configPath, 'configPath', process.cwd());
  if (existsSync(configPath)) {
    const config = readFileSync(configPath, 'utf-8');
    return JSON.parse(config);
  } else {
    throw new Error(`Config file not found at ${configPath}`);
  }
}
