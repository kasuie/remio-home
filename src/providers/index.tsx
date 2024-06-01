/*
 * @Author: kasuie
 * @Date: 2024-05-24 09:39:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-27 23:48:46
 * @Description:
 */
"use client";
import { ThemeProvider } from "next-themes";

export function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider key="themeProvider" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}
