/*
 * @Author: kasuie
 * @Date: 2024-05-20 19:57:07
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-20 19:58:18
 * @Description:
 */
import { Paw } from '@/components/icon';

export const Loader = ({
  className = '',
  warpClass = '',
  children,
  miao = false,
}: {
  className?: string;
  warpClass?: string;
  children?: React.ReactNode | string;
  miao?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-8 text-center ${warpClass}`}
    >
      {miao ? (
        <Paw
          className={className}
          style={{
            width: '300px',
            height: '200px',
          }}
        />
      ) : (
        <div className={`mio-loader relative h-10 w-10 ${className}`}></div>
      )}
      {miao && children && typeof children == 'string' ? (
        <p data-glitch={children} className="mio-glitch">
          {children}
        </p>
      ) : (
        <span>{children}</span>
      )}
    </div>
  );
};
