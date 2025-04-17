/*
 * @Author: kasuie
 * @Date: 2024-05-26 11:51:01
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-19 16:10:08
 * @Description:
 */
import { getConfig } from "@/lib/config";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async () => {
  const config = await getConfig();

  return new NextResponse(
    JSON.stringify({
      name: config.name,
      short_name: config.name,
      theme_color: "#FFFFFF",
      background_color: "#FFFFFF",
      display: "standalone",
      orientation: "portrait",
      start_url: "/",
      icons: [
        {
          src: "/icons/favicon64.png",
          sizes: "64x64",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/icons/favicon128.png",
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: "/icons/favicon192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/favicon512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    }),
    {
      headers: {
        "Content-Type": "application/manifest+json",
        "Content-Disposition": 'attachment; filename="manifest.json"',
      },
    }
  );
};
