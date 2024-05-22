/*
 * @Author: kasuie
 * @Date: 2024-05-22 15:54:06
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-22 19:22:20
 * @Description:
 */
import { Github, Google } from '@kasuie/icon';
export const SocialIcons = ({ data }: any) => {
  const coverData: any = [
    {
      title: 'qq',
      icon: () => <Github color="#dfba00" size={14} />,
      key: 'qq',
    },
    {
      title: 'twitter',
      icon: () => <Google color="#dfba00" size={14} />,
      key: 'twitter',
    },
  ];

  return (
    <div className="px-4 md:px-0">
      <ul className="relative m-0 flex flex-wrap justify-center gap-6 md:gap-9">
        {coverData.map((v: any, index: number) => {
          return (
            <li
              key={index}
              className="group relative flex h-9 w-9 flex-shrink-0 flex-grow-0 cursor-pointer items-center justify-center rounded-full bg-white/60 text-center text-[#3f345f] shadow-[0_5px_25px_#5d46e826] duration-500 ease-linear before:absolute before:left-[-8px] before:top-[-8px] before:h-[calc(100%+16px)] before:w-[calc(100%+16px)] before:animate-[1.5s_linear_0s_normal_none_infinite_focuse] before:rounded-full before:border before:border-[#ffffff8c] before:opacity-0 hover:animate-[move_0.9s_both] hover:before:animate-[1.5s_linear_0s_normal_none_infinite_focuse]"
            >
              <span className="mio-tooltip group-hover:pointer-events-auto group-hover:visible group-hover:bottom-[-50px] group-hover:opacity-100">
                {v.title}
              </span>
              {v.icon && v.icon()}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
