/*
 * @Author: kasuie
 * @Date: 2024-05-26 11:51:01
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-27 11:08:43
 * @Description: 
 */
import { getConfig } from '@/lib/config';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export const GET = async () => {
    const config = await getConfig('config.json');

    return new NextResponse(JSON.stringify({
        name: config.name,
        short_name: config.name,
        ...config.pwa
    }), {
        headers: {
            'Content-Type': 'application/manifest+json',
            'Content-Disposition': 'attachment; filename="manifest.json"',
        },
    });
};