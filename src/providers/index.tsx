/*
 * @Author: kasuie
 * @Date: 2024-05-24 09:39:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-16 16:27:34
 * @Description:
 */
"use client";
import { isClientSide } from "@kasuie/utils";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/system";
import { AppConfig } from "@/config/config";
import StyledRegistry from "./StyleJsxProvider";
import { createContext } from "react";
import Script from "next/script";

export const ConfigProvider = createContext({});

export function AppProviders({
  appConfig,
  children,
  ver,
}: Readonly<{
  appConfig?: AppConfig;
  children: React.ReactNode;
  ver?: string;
}>) {
  const router = useRouter();

  const { js, css } = appConfig?.resources || {};

  if (isClientSide) {
    console.log(
      `\n %c Remio-home${
        ver ? " v" + ver : ""
      } By kasuie %c https://github.com/kasuie`,
      "color:#555;background:linear-gradient(to right, #a8edea 0%, #fed6e3 100%);padding:5px 0;",
      "color:#fff;background:#fff;padding:5px 10px 5px 0px;"
    );
  }

  return (
    <NextUIProvider navigate={router.push}>
      <ThemeProvider
        attribute="class"
        key="themeProvider"
        defaultTheme="light"
        enableSystem
      >
        {css?.length
          ? css?.map((v: string) => <link rel="stylesheet" key={v} href={v} />)
          : null}
        {js?.length
          ? js?.map((v: string) => (
              <Script key={v} src={v} strategy={"afterInteractive"} />
            ))
          : null}
        <ConfigProvider.Provider value={{ appConfig: appConfig }}>
          <StyledRegistry>{children}</StyledRegistry>
        </ConfigProvider.Provider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
