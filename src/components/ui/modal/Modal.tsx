/*
 * @Author: kasuie
 * @Date: 2024-05-23 10:54:46
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-29 17:24:26
 * @Description:
 */
import ReactDOM from 'react-dom';
import { clsx } from '@kasuie/utils';
import { Cross } from "@kasuie/icon";

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

  return ReactDOM.createPortal(
    <div
      className={`fixed bottom-0 top-0 z-30 h-screen w-screen bg-black/10 backdrop-blur-lg backdrop-brightness-75 backdrop-saturate-150 duration-300 ${warpClass}`}
      onClick={() => {
        closeModal?.();
      }}
    >
      <div
        className={clsx(
          `absolute bottom-0 left-1/2 right-0 top-1/2 z-20 max-h-[60%] min-w-[95vw] max-w-[95vw] translate-x-[-50%] translate-y-[-50%] scale-0 overflow-hidden rounded-xl bg-[#16181aa8] p-[30px_10px] shadow-[0_12px_34px_6px_#0000002e] duration-300 ease-in-out md:min-w-min md:max-w-[80%] md:p-[40px_20px_30px_20px] ${className}`,
          {
            'scale-100': visible,
          }
        )}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <span
          className={
            'absolute right-3 rotate-0 top-[10px] cursor-pointer duration-300 hover:rotate-[180deg]'
          }
          onClick={() => {
            closeModal?.();
          }}
        >
          <Cross  size={20} />
        </span>
        {title ? (
          <div className={'text-center text-2xl font-semibold'}>{title}</div>
        ) : null}
        <div
          className={`mio-scroll max-h-full min-h-40 overflow-y-auto p-[15px_5px] ${mainClass}`}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
