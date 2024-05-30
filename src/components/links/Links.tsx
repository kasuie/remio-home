/*
 * @Author: kasuie
 * @Date: 2024-05-22 19:32:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-30 21:22:04
 * @Description:
 */
'use client';
import { Image } from '@/components/ui/image/Image';
import useModal from '@/components/ui/modal/useModal';
import { Modal } from '@/components/ui/modal/Modal';
import Link from 'next/link';
import { ExternalLink, DotsHorizontal } from '@kasuie/icon';
import { clsx } from '@kasuie/utils';
import { Site, SitesConfig } from '@/config/config';
import { motion } from 'framer-motion';

export function Links({
  staticSites,
  modalSites,
  primaryColor,
  sitesConfig = {
    hoverScale: true,
    hoverBlur: true,
    modal: true,
  },
  motions = {}
}: {
  primaryColor?: string;
  staticSites: Array<Site>;
  modalSites: Array<Site>;
  sitesConfig?: SitesConfig;
  motions?: object;
}) {
  const { isVisible, openModal, closeModal } = useModal();

  const itemContent = (item: Site, animate: boolean = true) => {
    return (
      <>
        {/* {animate && (
          <div className="absolute left-[20px] right-0 top-24 z-[-1] h-[25rem] w-[25rem] rotate-[-36deg] rounded-full bg-[#3651cf26] duration-500 group-hover/main:left-[-20px] group-hover/main:top-[-20px]"></div>
        )} */}
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
        { item?.url ? <ExternalLink size={14} /> : <DotsHorizontal size={14} /> }
        </span>
      </>
    );
  };

  const linkItem = (item: Site, key: number, animate: boolean = true) => {

    const className = clsx(
      'group/main relative shadow-mio-link z-[1] m-2 flex min-h-[90px] flex-[0_50%] flex-row flex-nowrap items-center gap-[10px] overflow-hidden rounded-2xl bg-black/10 p-[10px_15px] duration-500 hover:z-10 hover:border-transparent hover:!blur-none',
      {
        'hover:!scale-110 backdrop-blur-[7px]':
          animate, // hover:bg-[#229fff]
        'group-hover/links:scale-90': sitesConfig.hoverScale,
        'group-hover/links:blur-[1px]': sitesConfig.hoverBlur
      }
    );

    return (
      <div
        key={key}
        className={clsx('flex cursor-pointer flex-col justify-center', {
          'basis-72': animate,
          'basis-full md:basis-[45%]': !animate,
        })}
      >
        {item?.url ? (
          <Link href={item.url} className={className} target="_blank">
            {itemContent(item, animate)}
          </Link>
        ) : (
          <div onClick={() => sitesConfig?.modal && openModal()} className={className}>
            {itemContent(item)}
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div {...motions} className="group/links mt-3 flex w-[95vw] flex-wrap gap-[20px_0] justify-evenly md:mt-12 md:w-[70vw]">
      {staticSites.map((v, index) => linkItem(v, index))}
      {sitesConfig?.modal && modalSites?.length ? (
        <Modal
          className="w-[650px]"
          visible={isVisible}
          closeModal={closeModal}
        >
          <div className="flex flex-wrap justify-between">
            {modalSites.map((v, index) => linkItem(v, index, false))}
          </div>
        </Modal>
      ) : null}
    </motion.div>
  );
}
