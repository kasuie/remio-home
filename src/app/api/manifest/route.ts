/*
 * @Author: kasuie
 * @Date: 2024-05-26 11:51:01
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-26 11:53:04
 * @Description: 
 */
import { getConfig } from '@/lib/config';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export const GET = async () => {
    const config = await getConfig('config.json');
    return NextResponse.json({
        name: config.name,
        short_name: config.name,
        ...config.pwa
    });
};