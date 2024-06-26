/*
 * @Author: kasuie
 * @Date: 2024-05-20 17:15:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-26 23:02:57
 * @Description:
 */
import StyleRegistry from "./StyleRegistry";
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className={"mio-fonts relative min-h-screen"}>{children}</main>;
      <StyleRegistry></StyleRegistry>
    </>
  );
}
