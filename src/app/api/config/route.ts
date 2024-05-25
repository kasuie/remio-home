/*
 * @Author: kasuie
 * @Date: 2024-05-25 21:20:01
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-25 22:10:20
 * @Description: 
 */
import { getConfig } from '@/lib/config';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export const GET = async () => {
    const config = await getConfig('config.json');
    return NextResponse.json({
        data: config,
        success: true,
        message: '操作成功',
      });
};