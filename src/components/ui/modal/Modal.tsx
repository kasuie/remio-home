/*
 * @Author: kasuie
 * @Date: 2024-05-23 10:54:46
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-23 11:15:10
 * @Description:
 */
import ReactDOM from 'react-dom';
import { clsx } from '@kasuie/utils';

export function Modal({
  children,
  title,
  visible,
  closeModal,
}: {
  children?: React.ReactNode;
  title?: string;
  visible: boolean;
  closeModal?: Function;
}) {
  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      className={'k-modal-wrap'}
      onClick={() => {
        closeModal?.();
      }}
    >
      <div
        className={clsx('k-modal', {
          'k-modal-opened': visible,
        })}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <span
          className={'k-modal-close'}
          onClick={() => {
            closeModal?.();
          }}
        >
          x{/* <CloseOutline color="#ffffff80" size={24}></CloseOutline> */}
        </span>
        {title ? <div className={'k-modal-title'}>{title}</div> : null}
        <div className={'k-modal-content'}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
