/*
 * @Author: kasuie
 * @Date: 2024-05-20 17:15:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-20 19:33:57
 * @Description:
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen">
      {children}
      <footer className=" absolute bottom-2 left-1/2 translate-x-[-50%] cursor-pointer select-none whitespace-nowrap text-sm">
        © 2020 - 2024 By KASUIE
      </footer>
    </main>
  );
}
