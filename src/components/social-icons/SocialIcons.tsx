/*
 * @Author: kasuie
 * @Date: 2024-05-22 15:54:06
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-23 19:57:08
 * @Description:
 */
import { Github, Twitter } from '@kasuie/icon';
import Link from 'next/link';
import { Avatar } from '../ui/image/Avatar';

export type SocialItem = {
  icon?: string;
  title: string;
  url?: string;
  color?: string;
};

export const SocialIcons = ({ links }: { links: Array<SocialItem> }) => {

  const IconsMap = {
    github: <Github />,
    twitter: <Twitter />,
  }

  return (
    <div className="px-4 md:px-0">
      <ul className="relative m-0 flex flex-wrap justify-center gap-6 md:gap-9">
        {links?.map((v: SocialItem, index: number) => {
          return (
            <Link
              key={index}
              href={v?.url || ''}
              className="group relative flex h-9 w-9 flex-shrink-0 flex-grow-0 cursor-pointer items-center justify-center rounded-full bg-white/60 text-center text-[#3f345f] shadow-[0_5px_25px_#5d46e826] duration-500 ease-linear before:absolute before:left-[-8px] before:top-[-8px] before:h-[calc(100%+16px)] before:w-[calc(100%+16px)] before:animate-[1.5s_linear_0s_normal_none_infinite_focuse] before:rounded-full before:border before:border-[#ffffff8c] before:opacity-0 hover:animate-[move_0.9s_both] hover:before:animate-[1.5s_linear_0s_normal_none_infinite_focuse]"
            >
              {v.title && (
                <span className="mio-tooltip group-hover:pointer-events-auto group-hover:visible group-hover:bottom-[-50px] group-hover:opacity-100">
                  {v.title}
                </span>
              )}
              {v.icon ? (
                <Avatar
                  alt={v.title}
                  src={v.icon}
                  width={18}
                  height={18}
                  style={{
                    borderRadius: '50%',
                  }}
                />
              ) : (
                <Github size={16} />
              )}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
