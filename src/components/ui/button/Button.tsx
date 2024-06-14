/*
 * @Author: kasuie
 * @Date: 2024-06-14 11:06:48
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-14 15:19:16
 * @Description: 
 */
"use client";
import { ButtonHTMLAttributes } from "react";
import { clsx } from "@kasuie/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { 
    loading?: boolean;
}

export const Button = ({
    className,
    children,
    loading,
    onClick,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={clsx("bg-[#23c483] flex items-center justify-center gap-[2px] border-none outline-none tracking-[4px] min-w-24 px-3 py-2", {
                [`${className}`]: className,
                "rounded-sm": !className
            })}
            onClick={(e) => {
                !loading && onClick && onClick(e);
            }}
            {...props}
        >
            <span>{children}</span>
            { loading && <span className="animate-spin ease-linear rounded-full w-4 h-4 border-t-2 border-b-2"></span>}
        </button>
    );
};