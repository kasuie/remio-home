/*
 * @Author: kasuie
 * @Date: 2024-05-23 10:54:46
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-30 22:11:47
 * @Description:
 */
import ReactDOM from 'react-dom';
import { clsx } from '@kasuie/utils';
import { Cross } from "@kasuie/icon";
import { AnimatePresence, motion } from 'framer-motion';

export function Modal({
  children,
  title,
  visible,
  closeModal,
  className = '',
  warpClass = '',
  mainClass = '',
}: {
  children?: React.ReactNode;
  title?: string;
  visible: boolean;
  closeModal?: Function;
  className?: string;
  warpClass?: string;
  mainClass?: string;
}) {
  if (!visible) return null;

  // const modalVariants = {
  //   hidden: { opacity: 0, scale: 0.5 },
  //   visible: { opacity: 1, scale: 1 },
  //   exit: { opacity: 0, scale: 0.5 },
  // };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed inset-0 z-30 flex items-center justify-center bg-black/10 backdrop-blur-lg backdrop-brightness-75 backdrop-saturate-150 ${warpClass}`}
          onClick={() => {
            closeModal?.();
          }}
          // initial="hidden"
          // animate="visible"
          // exit="exit"
          // variants={modalVariants}
          // transition={{ duration: 0 }}
        >
          <motion.div
            className={clsx(
              `z-20 max-h-[60%] relative h-full ease-in-out min-w-[95vw] max-w-[95vw] overflow-hidden rounded-xl bg-[#16181aa8] p-[30px_10px] shadow-[0_12px_34px_6px_#0000002e] md:min-w-min md:max-w-[80%] md:p-[40px_20px_30px_20px] ${className}`,
              {
                'scale-100': visible,
              }
            )}
            onClick={(e) => {
              e.stopPropagation();
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span
              className={
                'absolute right-3 rotate-0 top-[10px] cursor-pointer duration-300 hover:rotate-[180deg]'
              }
              onClick={() => {
                closeModal?.();
              }}
            >
              <Cross size={20} />
            </span>
            {title ? (
              <div className={'text-center text-2xl font-semibold'}>{title}</div>
            ) : null}
            <div
              className={`mio-scroll max-h-full min-h-40 overflow-y-auto p-[15px_5px] ${mainClass}`}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
