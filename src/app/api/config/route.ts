/*
 * @Author: kasuie
 * @Date: 2024-05-25 21:20:01
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-25 21:21:22
 * @Description: 
 */
import { getConfig } from '@/lib/config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
    const data = await getConfig('config.json');
    return NextResponse.json({
        data: data,
        success: true,
        message: '操作成功',
      });
};