/*
 * @Author: kasuie
 * @Date: 2024-06-13 14:17:37
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 15:10:45
 * @Description: 
 */
"use client";
import { RadioGroup as URadioGroup, Radio as URadio, type RadioGroupProps, type RadioProps } from "@nextui-org/radio";

export const Radio = ({
    items,
    orientation = "horizontal",
    ...radioProps
}: {
    items?: Array<any>;
} & RadioGroupProps) => {
    return (
        <URadioGroup orientation={orientation} {...radioProps}>
            {
                items?.map((v, index) => (<URadio key={index} value={v?.value}>{v?.label}</URadio>))
            }
        </URadioGroup>
    );
};