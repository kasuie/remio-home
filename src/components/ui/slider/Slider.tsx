/*
 * @Author: kasuie
 * @Date: 2024-06-04 14:50:02
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-04 21:19:57
 * @Description:
 */
export const Slider = ({
  className = "",
  warpClass = "",
  children,
  value = 0,
  title,
  color = "#fff",
}: {
  className?: string;
  warpClass?: string;
  children?: React.ReactNode | string;
  value?: number;
  title?: string;
  color?: string;
}) => {
  return (
    <li title={title} className={`flex w-full flex-col gap-1 ${warpClass}`}>
      <div>
        <label className="text-xs font-medium">{title}</label>
      </div>
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/30">
        <div
          className="absolute h-full duration-150"
          style={{
            left: "0",
            width: `${value}%`,
            background: color,
          }}
        ></div>
      </div>
    </li>
  );
};
