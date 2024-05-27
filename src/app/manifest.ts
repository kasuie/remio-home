/*
 * @Author: kasuie
 * @Date: 2024-05-27 11:18:39
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-27 11:25:45
 * @Description: 
 */
import { getConfig } from "@/lib/config";

export default async function manifest() {
    
    const appConfig = await getConfig('config.json');
    
    const manifest = {        
        name: appConfig.name,
        short_name: appConfig.name,
        ...appConfig.pwa
    };

    return manifest;
}