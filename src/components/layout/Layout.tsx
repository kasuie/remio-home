/*
 * @Author: kasuie
 * @Date: 2024-05-20 17:15:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-26 16:33:04
 * @Description:
 */

export function Layout({ children }: { children: React.ReactNode }) {
  return <main className={"relative min-h-screen"}>{children}</main>;
}
