/*
 * @Author: kasuie
 * @Date: 2024-05-22 19:32:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-23 11:53:31
 * @Description:
 */
'use client';
import { Image } from '@/components/ui/image/Image';
import useModal from '@/components/ui/modal/useModal';
import { Modal } from '@/components/ui/modal/Modal';
import Link from 'next/link';
import { LinkIn } from '@kasuie/icon';

export function Links() {
  const { isVisible, openModal, closeModal } = useModal();

  const staticSites = [
    {
      icon: 'https://cs.kasuie.cc/icons/d5570e8a-a826-47be-91b2-f6949b743111.webp!cover',
      title: 'KASUIEの次元',
      site: 'https://kasuie.cc',
      desc: '博客主页',
    },
    {
      icon: 'https://cs.kasuie.cc/icons/1419ac35-0a57-4359-bb2f-55a26fc52bd8.png!cover',
      title: 'Mio 导航',
      site: 'https://nav.kasuie.cc',
      desc: 'Mio 网站导航',
    },
    {
      icon: 'https://cs.kasuie.cc/icons/a8cb45a8-c0ec-41e7-ab8f-ff4fe8817230.jpg!cover',
      title: 'KASUIEのAI',
      site: 'https://ai.kasuie.cc',
      desc: 'ChatGPT',
    },
    {
      icon: 'https://cs.kasuie.cc/icons/1419ac35-0a57-4359-bb2f-55a26fc52bd8.png!cover',
      title: 'KASUIEの库',
      site: 'https://dist.kasuie.cc',
      desc: '网盘挂载程序',
    },
    {
      icon: 'https://cs.kasuie.cc/icons/0d2e7fe7-3cca-4989-9bb4-4a39cee77801.png!cover',
      title: 'KASUIEの图床',
      site: 'https://upload.kasuie.cc',
      desc: '图床服务',
    },
    {
      icon: 'https://cs.kasuie.cc/icons/d5570e8a-a826-47be-91b2-f6949b743111.webp!cover',
      title: '监控服务',
      site: 'https://status.kasuie.cc/status',
      desc: '服务程序监控',
    },
    {
      icon: 'https://cs.kasuie.cc/icons/d5570e8a-a826-47be-91b2-f6949b743111.webp!cover',
      title: 'KASUIEのDocs',
      site: 'https://docs.kasuie.cc',
      desc: '文档服务',
    },
    {
      icon: 'https://cs.kasuie.cc/icons/a8cb45a8-c0ec-41e7-ab8f-ff4fe8817230.jpg!cover',
      title: '杂七杂八',
      desc: '阿巴阿巴...',
      type: 'more',
    },
  ];

  const linkItem = (item: any, key: number) => {
    return (
      <div
        className="flex basis-72 cursor-pointer flex-col justify-center"
        key={key}
      >
        <Link
          href={item.type && item.type === 'more' ? '' : item.site}
          className="group/main relative z-[1] m-2 flex min-h-[90px] flex-[0_50%] flex-row flex-nowrap items-center gap-[10px] overflow-hidden rounded-2xl bg-black/10 p-[10px_15px] backdrop-blur-[7px] duration-500 hover:z-10 hover:!scale-110 hover:border-transparent hover:bg-[#229fff] hover:!blur-none group-hover/links:scale-90 group-hover/links:blur-[1px]"
          target="_blank"
        >
          <div className="absolute left-[20px] right-0 top-24 z-[-1] h-[25rem] w-[25rem] rotate-[-36deg] rounded-full bg-[#3651cf26] duration-500 group-hover/main:left-[-20px] group-hover/main:top-[-20px]"></div>
          {item.icon && (
            <div className="p-[5px]">
              <Image
                alt={item.title}
                src={item.icon}
                width={42}
                height={42}
                style={{
                  borderRadius: '50%',
                }}
              ></Image>
            </div>
          )}
          <div className="p-[5px]">
            {item.title && <p className="text-white">{item.title}</p>}
            {item.desc && (
              <p className="pt-[10px] text-[15px] text-white/70">{item.desc}</p>
            )}
          </div>
          <span className="absolute bottom-[5px] right-[7px]">
            <LinkIn size={12} />
          </span>
        </Link>
      </div>
    );
  };

  return (
    <div className="group/links mt-3 flex w-[95vw] flex-wrap justify-evenly md:mt-12 md:w-[70vw]">
      {staticSites.map((v, index) => linkItem(v, index))}
      {staticSites?.length > 8 ? (
        <>
          <Modal visible={isVisible} closeModal={closeModal}>
            454545
          </Modal>
        </>
      ) : null}
    </div>
  );
}
