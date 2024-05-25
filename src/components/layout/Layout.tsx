/*
 * @Author: kasuie
 * @Date: 2024-05-20 17:15:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-26 01:14:21
 * @Description:
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={`relative min-h-screen before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:bg-[url('https://cdn.jsdelivr.net/gh/pixlips/picx-images-hosting@master/next/bg_main_new.e8a46387_cr.3w1kjh9qu3w0.webp')] before:bg-cover before:bg-fixed before:bg-center before:bg-no-repeat before:blur-sm before:brightness-50 md:before:bg-[url('https://cdn.jsdelivr.net/gh/pixlips/picx-images-hosting@master/web/aierm-hahee.fmu4lbhz3w0.webp')]`}
    >
      {children}
    </main>
  );
}
