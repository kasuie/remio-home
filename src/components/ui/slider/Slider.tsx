/*
 * @Author: kasuie
 * @Date: 2024-06-04 14:50:02
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-04 17:02:30
 * @Description: 
 */
export const Slider = ({
    className = "",
    warpClass = "",
    children,
    value = 0,
    title,
    color = "#fff"
}: {
    className?: string;
    warpClass?: string;
    children?: React.ReactNode | string;
    value?: number;
    title?: string;
    color?: string;
}) => {
    return (
        <li
            className={`${warpClass} w-full flex flex-col gap-1`}
        >
            <div><label className="text-base">{title}</label></div>
            <div className="bg-white/50 overflow-hidden relative rounded-full w-full h-1">
                <div className="h-full absolute" style={{
                    left: "0",
                    width: `${value}%`,
                    background: color
                }}></div>
            </div>
        </li>
    );
};
